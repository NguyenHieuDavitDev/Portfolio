import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Cuộn tới #section khi vào `/` kèm hash (ví dụ `/#Projects`). */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== "/" || !hash) return;
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    if (!id) return;
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  return null;
}
