import { useCallback, useRef, useState } from "react";

export function useToast(timeoutMs = 5000) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  const showToast = useCallback((msg) => {
    setMessage(String(msg || ""));
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), timeoutMs);
  }, [timeoutMs]);

  return { message, visible, showToast };
}
