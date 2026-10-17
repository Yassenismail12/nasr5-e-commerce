import { useEffect, useState } from "react";

export default function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      if (ignore) return;
      setLoading(true);
      setError(null);

      try {
        const result = await fetcher();
        if (!ignore) setData(result);
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    void Promise.resolve().then(load);

    return () => {
      ignore = true;
    };
  }, [fetcher]);

  return { data, loading, error };
}