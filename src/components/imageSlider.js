import React, { useEffect, useMemo, useState } from "react";

export default function ImageSlider({
  images = [],
  intervalMs = 4500,
  height = "clamp(220px, 45vw, 420px)",
}) {
  const safeImages = useMemo(
    () => images.filter(Boolean),
    [images]
  );

  const [index, setIndex] = useState(0);
  const count = safeImages.length;

  useEffect(() => {
    if (count <= 1) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);

    return () => clearInterval(id);
  }, [count, intervalMs]);

  if (count === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  return (
    <div style={{ ...styles.wrap, height }}>
      {/* Slide track */}
      <div
        style={{
          ...styles.track,
          width: `${count * 100}%`,
          transform: `translateX(-${index * (100 / count)}%)`,
        }}
      >
        {safeImages.map((src, i) => (
          <div key={src + i} style={{ ...styles.slide, width: `${100 / count}%` }}>
            <div
              style={{
                ...styles.image,
                backgroundImage: `url(${src})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      {count > 1 && (
        <>
          <button type="button" onClick={prev} style={{ ...styles.arrow, left: 10 }}>
            ‹
          </button>
          <button type="button" onClick={next} style={{ ...styles.arrow, right: 10 }}>
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <div style={styles.dots}>
          {safeImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                ...styles.dot,
                opacity: i === index ? 1 : 0.45,
                transform: i === index ? "scale(1.05)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: {
    position: "relative",
    width: "100%",
    borderRadius: "14px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.35)",
  },
  track: {
    display: "flex",
    height: "100%",
    transition: "transform 450ms ease",
  },
  slide: {
    height: "100%",
    flex: "0 0 auto",
  },
  image: {
    height: "100%",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.9)",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "44px",
    height: "44px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(0,0,0,0.45)",
    color: "white",
    fontSize: "26px",
    fontWeight: 900,
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    userSelect: "none",
  },
  dots: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    padding: "0 10px",
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
