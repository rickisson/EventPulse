import { useState, useEffect, useMemo } from "react";
import { mockEvents } from "../data/events";

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("timestamp");
  const [selectedId, setSelectedId] = useState(null);

  // Simulate async API fetch
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      try {
        setEvents(mockEvents);
        setLoading(false);
      } catch (e) {
        setError("Failed to load events.");
        setLoading(false);
      }
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let result = [...events];

    if (filterType !== "all") {
      result = result.filter((e) => e?.type === filterType);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e?.id?.toLowerCase().includes(q) ||
          e?.description?.toLowerCase().includes(q) ||
          e?.location?.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "confidence") return (b?.confidence ?? 0) - (a?.confidence ?? 0);
      if (sortBy === "timestamp") return new Date(b?.timestamp ?? 0) - new Date(a?.timestamp ?? 0);
      return 0;
    });

    return result;
  }, [events, filterType, search, sortBy]);

  const selectedEvent = useMemo(
    () => events.find((e) => e.id === selectedId) ?? null,
    [events, selectedId]
  );

  const getRelatedEvents = (ids = []) =>
    events.filter((e) => ids.includes(e.id));

  return {
    events,
    filtered,
    loading,
    error,
    search,
    setSearch,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    selectedId,
    setSelectedId,
    selectedEvent,
    getRelatedEvents,
  };
}