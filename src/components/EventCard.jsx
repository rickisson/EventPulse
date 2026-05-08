import { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function EventCard({ event, isSelected, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  if (!event) return null;

  const conf = event.confidence ?? null;
  const confColor = conf === null ? "#888" : conf >= 0.85 ? "#ff4455" : conf >= 0.7 ? "#ffaa00" : "#00ccff";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`py-[14px] px-[14px] border-b border-b-border border-l-2 cursor-pointer transition-all duration-150 ${
        isSelected
          ? "bg-card-active border-l-accent"
          : isHovered
          ? "bg-card-hover border-l-transparent"
          : "bg-transparent border-l-transparent"
      }`}
    >
      <div className="flex justify-between items-center mb-[6px]">
        <StatusBadge type={event.type} />
        <span className="font-space-mono text-xs font-bold" style={{ color: confColor }}>
          {conf !== null ? `${Math.round(conf * 100)}%` : "N/A"}
        </span>
      </div>

      <div className="font-syne text-sm font-semibold text-fg mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {event.description ?? "No description"}
      </div>

      <div className="flex gap-3">
        <span className="font-space-mono text-xs text-muted">
          {event.location ?? "Unknown"}
        </span>
        <span className="font-space-mono text-xs text-muted">
          {event.timestamp ? new Date(event.timestamp).toLocaleTimeString() : "—"}
        </span>
      </div>
    </div>
  );
}
