
import { useEffect } from "react";

function useLocalStorage(key, value, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, enabled]);
}

export default useLocalStorage;
