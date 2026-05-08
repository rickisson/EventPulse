const inputClass =
  "flex-1 bg-transparent border border-border rounded-[2px] text-fg font-space-mono text-xs px-[10px] py-1 outline-none min-w-[160px]";

export default function FilterBar({ search, setSearch, filterType, setFilterType, sortBy, setSortBy, total, filtered }) {
  return (
    <div className="flex gap-2 flex-wrap items-center py-3 border-b border-b-border mb-1">
      <input
        className={inputClass}
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select className={inputClass} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="all">All Types</option>
        <option value="alert">Alert</option>
        <option value="movement">Movement</option>
        <option value="signal">Signal</option>
      </select>

      <select className={inputClass} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="timestamp">Sort: Latest</option>
        <option value="confidence">Sort: Confidence</option>
      </select>

      <span className="font-space-mono text-xs text-muted ml-auto whitespace-nowrap">
        {filtered}/{total} events
      </span>
    </div>
  );
}
