import StatusBadge from "./StatusBadge";
import EventCard from "./EventCard";

export default function EventDetail({ event, relatedEvents, onSelectRelated }) {
  if (!event) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2 text-muted font-space-mono text-xs tracking-[0.1em]">
      <div className="text-5xl opacity-20">◎</div>
      SELECT AN EVENT
    </div>
  );

  const conf = event.confidence ?? null;
  const confPct = conf !== null ? Math.round(conf * 100) : null;
  const confColor = conf === null ? "#888" : conf >= 0.85 ? "#ff4455" : conf >= 0.7 ? "#ffaa00" : "#00ccff";

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">

      <div>
        <div className="flex items-center gap-[10px] mb-1">
          <StatusBadge type={event.type} />
          <span className="font-space-mono text-xs text-muted">
            {event.id ?? "—"}
          </span>
        </div>
        <h2 className="font-syne font-black text-2xl text-fg m-0 leading-[1.2]">
          {event.description ?? "No description available"}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-px bg-border border border-border rounded-[2px] overflow-hidden text-xs font-space-mono">
        {[
          ["LOCATION", event.location ?? "Unknown"],
          ["TIMESTAMP", event.timestamp ? new Date(event.timestamp).toLocaleString() : "—"],
          ["CONFIDENCE", confPct !== null ? `${confPct}%` : "N/A"],
          ["RELATED", `${(event.related_ids ?? []).length} events`],
        ].map(([label, value]) => (
          <div key={label} className="p-[10px] bg-card-hover">
            <div className="text-muted text-xs tracking-[0.1em] mb-[2px]">{label}</div>
            <div
              className={label === "CONFIDENCE" ? "font-bold" : "font-bold text-fg"}
              style={{ color: label === "CONFIDENCE" ? confColor : undefined }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {confPct !== null && (
        <div>
          <div className="font-space-mono text-xs text-muted mb-[6px] tracking-[0.1em]">
            CONFIDENCE LEVEL
          </div>
          <div className="bg-border rounded-[2px] h-1 overflow-hidden">
            <div
              className="h-full rounded-[2px] transition-all duration-[400ms]"
              style={{ width: `${confPct}%`, background: confColor }}
            />
          </div>
        </div>
      )}

      {relatedEvents.length > 0 && (
        <div>
          <div className="font-space-mono text-xs text-muted tracking-[0.1em] mb-2">
            RELATED EVENTS
          </div>
          <div className="border border-border rounded-[2px] overflow-hidden">
            {relatedEvents.map((rel) => (
              <EventCard
                key={rel.id}
                event={rel}
                isSelected={false}
                onClick={() => onSelectRelated(rel.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
