import { useState } from "react";
import { useEvents } from "./hooks/useEvents";
import FilterBar from "./components/FilterBar";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";

export default function App() {
  const {
    events, filtered, loading, error,
    search, setSearch,
    filterType, setFilterType,
    sortBy, setSortBy,
    selectedId, setSelectedId,
    selectedEvent, getRelatedEvents,
  } = useEvents();

  const [mobileView, setMobileView] = useState("list");

  const relatedEvents = selectedEvent ? getRelatedEvents(selectedEvent.related_ids ?? []) : [];

  const handleSelect = (id) => {
    setSelectedId(id);
    setMobileView("detail");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">

      <header className="flex items-center justify-between px-5 h-14 border-b border-b-border shrink-0">
        <div className="flex items-center gap-3">
          {mobileView === "detail" && (
            <button
              onClick={() => setMobileView("list")}
              className="md:hidden font-space-mono text-xs text-muted pr-3 border-r border-r-border mr-1 cursor-pointer"
            >
              ← BACK
            </button>
          )}
          <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 [box-shadow:0_0_10px_var(--accent)]" />
          <span className="font-syne font-black text-2xl tracking-[0.05em] text-fg">
            EVENT<span className="text-accent">PULSE</span>
          </span>
        </div>
        <span className="font-space-mono text-xs text-muted">MONITOR v1.0</span>
      </header>

      <div className="flex flex-1 overflow-hidden">

        <div className={`flex-col overflow-hidden w-full md:w-[320px] md:shrink-0 md:border-r md:border-r-border ${mobileView === "list" ? "flex" : "hidden md:flex"}`}>
          <div className="px-[14px]">
            <FilterBar
              search={search} setSearch={setSearch}
              filterType={filterType} setFilterType={setFilterType}
              sortBy={sortBy} setSortBy={setSortBy}
              total={events.length} filtered={filtered.length}
            />
          </div>
          <EventList
            events={filtered}
            selectedId={selectedId}
            onSelect={handleSelect}
            loading={loading}
            error={error}
          />
        </div>

        <div className={`flex-col overflow-hidden flex-1 ${mobileView === "detail" ? "flex" : "hidden md:flex"}`}>
          <EventDetail
            event={selectedEvent}
            relatedEvents={relatedEvents}
            onSelectRelated={handleSelect}
          />
        </div>

      </div>
    </div>
  );
}
