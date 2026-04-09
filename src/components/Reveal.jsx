import { useEffect, useRef, useState } from "react";

const variantClass = {
  "fade-up": "reveal-v-fade-up",
  fade: "reveal-v-fade",
  "slide-left": "reveal-v-slide-left",
  zoom: "reveal-v-zoom",
};

/**
 * Hiện nội dung khi cuộn vào viewport, có delay để tạo hiệu ứng lần lượt.
 */
export function Reveal({
  children,
  className = "",
  style = {},
  delay = 0,
  variant = "fade-up",
  once = true,
  threshold = 0.1,
  rootMargin = "0px 0px -6% 0px",
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  const v = variantClass[variant] ?? variantClass["fade-up"];

  return (
    <Tag
      ref={ref}
      className={`reveal-base ${v} ${visible ? "reveal-base--visible" : ""} ${className}`.trim()}
      style={{
        ...style,
        ["--reveal-delay"]: `${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
