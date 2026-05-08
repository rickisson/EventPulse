export default function StatusBadge({ type }) {
  const map = {
    alert:    { label: "ALERT",    color: "#ff4455" },
    movement: { label: "MOVEMENT", color: "#ffaa00" },
    signal:   { label: "SIGNAL",   color: "#00ccff" },
  };

  const { label, color } = map[type] ?? { label: type?.toUpperCase() ?? "UNKNOWN", color: "#888" };

  return (
    <span
      className="inline-flex items-center text-xs font-space-mono font-bold tracking-[0.1em] uppercase whitespace-nowrap opacity-90 rounded-[2px] px-2 py-[3px] border"
      style={{ color, borderColor: color }}
    >
      {label}
    </span>
  );
}
