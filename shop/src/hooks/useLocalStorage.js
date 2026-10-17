import { useEffect, useState } from "react";
import { readStoredValue, writeStoredValue } from "../utils/storage";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStoredValue(key, initialValue));

  useEffect(() => {
    writeStoredValue(key, value);
  }, [key, value]);

  return [value, setValue];
}