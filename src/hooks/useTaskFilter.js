
import { useMemo } from "react";

function useTaskFilter(tasks, searchTerm, priority) {
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPriority =
        priority === "All" || task.priority === priority;

      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchTerm, priority]);

  return filteredTasks;
}

export default useTaskFilter;
