import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

/**
 * CarDetails
 * - Route: /car/:id
 * - Reads car directly from Supabase
 * - Responsive layout
 */

export default function CarDetails() {
  const { id } = useParams();

  const base = process.env.PUBLIC_URL;
  const PLACEHOLDER_IMG = `${base}/inventory/placeholder.jpg`;

  // CAR DATA
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // MOBILE DETECTION
  const [isMobile, setIsMobile] = useState(false);

  // FETCH CAR
  useEffect(() => {
    const fetchCar = async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setCar(data);
      }

      setLoading(false);
    };

    fetchCar();
  }, [id]);

  // MOBILE LISTENER
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");

    const onChange = (e) => setIsMobile(e.matches);

    setIsMobile(mq.matches);

    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);

      return () =>
        mq.removeEventListener("change", onChange);
    }

    // Safari fallback
    mq.addListener(onChange);

    return () => mq.removeListener(onChange);
  }, []);

  // LOADING
  if (loading) {
    return (
      <div style={{ padding: 28 }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  // NOT FOUND
  if (!car) {
    return (
      <div style={{ padding: 28 }}>
        <h2>Car Not Found</h2>

        <Link to="/inventory">
          ← Back to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <Link
          to="/inventory"
          style={styles.backLink}
        >
          ← Back to Inventory
        </Link>

        <div
          style={{
            ...styles.grid,
            ...(isMobile ? styles.gridMobile : {}),
          }}
        >

          {/* IMAGE */}
          <div style={styles.imageWrap}>

           <img
            src={
              car.image
              ? `${process.env.PUBLIC_URL}${car.image}`
              : PLACEHOLDER_IMG
            }
            alt={`${car.year} ${car.make} ${car.model}`}
            style={{
              ...styles.image,
              ...(isMobile
                ? styles.imageMobile
                : {}),
              }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  PLACEHOLDER_IMG;
              }}
              />

          </div>

          {/* DETAILS CARD */}
          <div style={styles.card}>

            <h1
              style={{
                ...styles.title,
                ...(isMobile
                  ? styles.titleMobile
                  : {}),
              }}
            >
              {car.year} {car.make} {car.model}
            </h1>

            <div style={styles.price}>
              ${(car.price || 0).toLocaleString()}
            </div>

            <div style={styles.meta}>

              <span style={styles.badge}>
                {car.type?.toUpperCase() || "CAR"}
              </span>

              <span style={styles.miles}>
                {(car.mileage || 0).toLocaleString()} miles
              </span>

            </div>

            {/* HIGHLIGHTS */}
            <div style={styles.highlights}>

              <Highlight
                label="Engine"
                value={car.engine}
              />

              <Highlight
                label="Drivetrain"
                value={car.drivetrain}
              />

              <Highlight
                label="Horsepower"
                value={
                  car.hp != null
                    ? `${car.hp} hp`
                    : null
                }
              />

              <Highlight
                label="Torque"
                value={
                  car.torque != null
                    ? `${car.torque} lb-ft`
                    : null
                }
              />

              <Highlight
                label="Transmission"
                value={car.transmission}
              />

            </div>

            {/* BASIC SPECS */}
            <div style={styles.specs}>

              <Spec
                label="Make"
                value={car.make}
              />

              <Spec
                label="Model"
                value={car.model}
              />

              <Spec
                label="Year"
                value={car.year}
              />

              <Spec
                label="Type"
                value={car.type}
              />

            </div>

            {/* ACTIONS */}
            <div
              style={{
                ...styles.actions,
                ...(isMobile
                  ? styles.actionsMobile
                  : {}),
              }}
            >

              <Link
                to="/consultation"
                style={styles.primaryBtn}
              >
                Schedule Consultation
              </Link>

              <Link
                to="/inventory"
                style={styles.secondaryBtn}
              >
                Back to Browse
              </Link>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function Highlight({ label, value }) {
  return (
    <div style={styles.hlItem}>

      <div style={styles.hlTop}>
        {label}
      </div>

      <div style={styles.hlVal}>
        {value ?? "—"}
      </div>

    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div style={styles.spec}>

      <div style={styles.specLabel}>
        {label}
      </div>

      <div style={styles.specValue}>
        {value ?? "—"}
      </div>

    </div>
  );
}

const styles = {
  page: {
    background:
      "linear-gradient(180deg, #f8fbff 0%, #ffffff 60%, #fff5f6 100%)",
    color: "#0f172a",
    paddingBottom: 60,
  },

  container: {
    width: "min(1100px, calc(100% - 32px))",
    margin: "0 auto",
    padding: "28px 0 0",
  },

  backLink: {
    display: "inline-block",
    marginBottom: 14,
    fontSize: 14,
    fontWeight: 900,
    color: "#0ea5e9",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(14,165,233,0.1)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 18,
    alignItems: "start",
  },

  gridMobile: {
    gridTemplateColumns: "1fr",
  },

  imageWrap: {
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.10)",
    boxShadow: "0 12px 26px rgba(0,0,0,0.08)",
    background: "#e5e7eb",
  },

  image: {
    width: "100%",
    height: 420,
    objectFit: "cover",
    display: "block",
  },

  imageMobile: {
    height: 260,
  },

  card: {
    borderRadius: 18,
    border: "1px solid rgba(0,0,0,0.10)",
    boxShadow: "0 12px 26px rgba(0,0,0,0.08)",
    background: "#fff",
    padding: 16,
  },

  title: {
    margin: 0,
    fontSize: 26,
    fontWeight: 900,
    lineHeight: 1.15,
  },

  titleMobile: {
    fontSize: 22,
  },

  price: {
    marginTop: 10,
    fontWeight: 900,
    fontSize: 24,
  },

  meta: {
    marginTop: 10,
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  badge: {
    padding: "4px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(15,23,42,0.04)",
    fontWeight: 900,
    fontSize: 12,
  },

  miles: {
    fontWeight: 800,
    fontSize: 12,
    opacity: 0.7,
  },

  highlights: {
    marginTop: 14,
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 10,
  },

  hlItem: {
    padding: 12,
    borderRadius: 14,
    background:
      "linear-gradient(135deg, rgba(14,165,233,0.10), rgba(244,63,94,0.08))",
    border: "1px solid rgba(0,0,0,0.08)",
  },

  hlTop: {
    fontSize: 12,
    fontWeight: 900,
    opacity: 0.6,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },

  hlVal: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 900,
  },

  specs: {
    marginTop: 14,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },

  spec: {
    padding: 10,
    borderRadius: 14,
    background: "#f9fafb",
  },

  specLabel: {
    fontSize: 12,
    fontWeight: 900,
    opacity: 0.6,
  },

  specValue: {
    marginTop: 4,
    fontWeight: 900,
  },

  actions: {
    marginTop: 16,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  actionsMobile: {
    flexDirection: "column",
  },

  primaryBtn: {
    flex: 1,
    minWidth: 180,
    textAlign: "center",
    padding: "10px 12px",
    borderRadius: 12,
    background: "#0ea5e9",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 900,
  },

  secondaryBtn: {
    flex: 1,
    minWidth: 180,
    textAlign: "center",
    padding: "10px 12px",
    borderRadius: 12,
    background: "#111827",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 900,
  },
};