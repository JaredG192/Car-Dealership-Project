import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * HeroSlider
 *
 * Props:
 * - slides: Array of { image, title, subtitle?, ctas?: [{ label, href, variant?: "primary"|"secondary" }], showText?: boolean }
 * - intervalMs: auto-advance interval (disabled if slides <= 1)
 * - height: css height value (string)
 */
export default function HeroSlider({
  slides = [],
  intervalMs = 4500,
  height = "clamp(320px, 55vw, 560px)",
}) {
  const safeSlides = useMemo(() => slides.filter(Boolean), [slides]);

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const count = safeSlides.length;
  const timerRef = useRef(null);

  // If slides change and the current index is out of range, reset to 0.
  useEffect(() => {
    if (index > count - 1) setIndex(0);
  }, [count, index]);

  // Preload images to reduce white flash while switching slides
  useEffect(() => {
    safeSlides.forEach((s) => {
      if (!s?.image) return;
      const img = new Image();
      img.src = s.image;
    });
  }, [safeSlides]);

  // Auto-advance slides (pause when user hovers/touches)
  useEffect(() => {
    if (count <= 1) return;
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);

    return () => clearInterval(timerRef.current);
  }, [count, intervalMs, isPaused]);

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    if (count <= 1) return;

    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  if (count === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  const current = safeSlides[index] || {};
  const title = current.title || "";
  const subtitle = current.subtitle || "";
  const image = current.image || "";

  //  default true, but allow a slide to turn text off with showText: false
  const showText = current.showText !== false;

  return (
    <section
      style={{ ...styles.wrap, height }}
      aria-label="Hero slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Background image */}
    <div
  style={{
    ...styles.bg,
    backgroundImage: image ? `url(${image})` : "none",
    backgroundPosition: current.bgPosition || "center",
  }}
/>


      {/* Only show dark overlay + text on slides that want text */}
      {showText && !current.noOverlay && <div style={styles.overlay} />}
      {showText ? (
        <div style={styles.content}>
          <h1 style={styles.title}>{title}</h1>
          {subtitle ? <p style={styles.subtitle}>{subtitle}</p> : null}

          {current.ctas?.length ? (
            <div style={styles.ctaRow}>
              {current.ctas.map((cta) => (
                <Link
                  key={cta.label}
                  to={cta.href}
                  style={{
                    ...styles.cta,
                    ...(cta.variant === "primary" ? styles.primary : styles.secondary),
                  }}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Arrows (only show if more than 1 slide) */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            style={{ ...styles.arrow, left: 14 }}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            style={{ ...styles.arrow, right: 14 }}
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <div style={styles.dots} aria-label="Slide navigation">
          {safeSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                ...styles.dot,
                opacity: i === index ? 1 : 0.45,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  wrap: {
    position: "relative",
    width: "100%",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.12)",
    marginBottom: "18px",
  },
  bg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transform: "scale(1.02)",
    transition: "background-image 400ms ease",
    backgroundColor: "#000", // helps avoid white flash if image is ever missing
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
  },
  content: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "clamp(16px, 4vw, 34px)",
    maxWidth: "760px",
  },
  title: {
    color: "white",
    margin: 0,
    fontSize: "clamp(28px, 6vw, 52px)",
    fontWeight: 900,
    lineHeight: 1.05,
    textShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  subtitle: {
    margin: "10px 0 0 0",
    color: "rgba(255,255,255,0.92)",
    fontSize: "clamp(14px, 2.6vw, 18px)",
    lineHeight: 1.4,
  },
  ctaRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "16px",
  },
  cta: {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: "999px",
    fontWeight: 800,
    textDecoration: "none",
  },
  primary: { background: "white", color: "black" },
  secondary: {
    background: "rgba(255,255,255,0.14)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.22)",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "44px",
    height: "44px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(0,0,0,0.45)",
    color: "white",
    fontSize: "28px",
    fontWeight: 900,
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    zIndex: 3,
  },
  dots: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 12,
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    zIndex: 3,
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "999px",
    border: "none",
    background: "white",
    cursor: "pointer",
  },

};