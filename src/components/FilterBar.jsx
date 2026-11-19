
function FilterBar({
  searchTerm,
  setSearchTerm,
  priority,
  setPriority,
}) {
  const priorities = ["All", "High", "Medium", "Low"];

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search tasks by title or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="priority-filters">
        {priorities.map((item) => (
          <button
            key={item}
            className={priority === item ? "active-filter" : ""}
            onClick={() => setPriority(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
