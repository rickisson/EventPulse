import EventCard from "./EventCard";

export default function EventList({ events, selectedId, onSelect, loading, error }) {
  if (loading) return (
    <div className="py-10 px-5 text-center font-space-mono text-xs text-muted">
      <div className="pulse">LOADING EVENTS...</div>
    </div>
  );

  if (error) return (
    <div className="py-10 px-5 text-center font-space-mono text-xs text-alert">
      {error}
    </div>
  );

  if (events.length === 0) return (
    <div className="py-10 px-5 text-center font-space-mono text-xs text-muted">
      NO EVENTS MATCH
    </div>
  );

  return (
    <div className="overflow-y-auto flex-1">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isSelected={selectedId === event.id}
          onClick={() => onSelect(event.id)}
        />
      ))}
    </div>
  );
}
