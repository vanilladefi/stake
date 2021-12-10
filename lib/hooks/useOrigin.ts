import { useEffect, useState } from "react";

export default function useOrigin(): string {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  return origin;
}
