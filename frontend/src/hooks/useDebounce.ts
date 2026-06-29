// Returns a debounced copy of `value` that only updates after `delay` ms
// without changes. Useful for throttling search-as-you-type requests.
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
