import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cars } from "../data/cars";

/**
 * Inventory
 * - Displays vehicle cards with filtering + sorting
 * - Supports URL filter: /inventory?type=suv
 * - Supports manufacturer pages via props
 */
export default function Inventory({ defaultMake = "", hideMakeFilter = false }) {
  const location = useLocation();
  const base = process.env.PUBLIC_URL;

  // Local fallback image (keeps app working if an image is missing)
  const PLACEHOLDER_IMG = `${base}/inventory/placeholder.jpg`;

  // Manufacturer logos (stored in: public/brands/)
  const makeLogoMap = useMemo(
    () => ({
      Toyota: `${base}/brands/Toyota.png`,
      Honda: `${base}/brands/Honda.png`,
      Nissan: `${base}/brands/Nissan.png`,
      Subaru: `${base}/brands/Subaru.png`,
      Mazda: `${base}/brands/Mazda.png`,
      Kia: `${base}/brands/Kia.png`,
      Ford: `${base}/brands/Ford.png`,
      Chevrolet: `${base}/brands/Chevrolet.png`,
    }),
    [base]
  );

  /**
   * Read initial vehicle type from URL.
   * Examples:
   * - /inventory?type=suv
   * - /inventory?type=SUV
   * - /inventory?type=Truck
   */
  const urlType = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return (params.get("type") || "").trim().toLowerCase();
  }, [location.search]);

  // Filters / Sort state
  const [makeFilter, setMakeFilter] = useState(defaultMake);
  const [typeFilter, setTypeFilter] = useState(urlType);
  const [sortBy, setSortBy] = useState("recommended");

  // Keep make synced when using manufacturer pages
  useEffect(() => {
    setMakeFilter(defaultMake || "");
  }, [defaultMake]);

  // Keep type synced with URL (?type=suv)
  useEffect(() => {
    setTypeFilter(urlType || "");
  }, [urlType]);

  // Dropdown make options (cars is a static import, so deps can be [])
  const makes = useMemo(() => {
    const set = new Set(cars.map((c) => c.make));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  // Apply filters + sorting
  const filtered = useMemo(() => {
    let list = cars;

    if (makeFilter) {
      list = list.filter((c) => c.make === makeFilter);
    }

    if (typeFilter) {
      list = list.filter((c) => (c.type || "").toLowerCase() === typeFilter);
    }

    const sorted = [...list];

    switch (sortBy) {
      case "priceLow":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "yearNew":
        sorted.sort((a, b) => b.year - a.year);
        break;
      case "milesLow":
        sorted.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        break;
    }

    return sorted;
  }, [makeFilter, typeFilter, sortBy]);

  const pageTitle = defaultMake ? `${defaultMake} Inventory` : "Inventory";
  const makeLogoSrc = defaultMake ? makeLogoMap[defaultMake] : "";

  const handleReset = () => {
    // On manufacturer pages, keep make locked
    if (!defaultMake) setMakeFilter("");
    setTypeFilter("");
    setSortBy("recommended");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Navigation */}
        <div style={styles.navRow}>
          <Link to="/" style={styles.backLink}>
            ← Home
          </Link>

          {defaultMake && (
            <Link to="/inventory" style={styles.backLink}>
              ← Inventory
            </Link>
          )}
        </div>

        {/* Title */}
        <div style={styles.titleRow}>
          {makeLogoSrc && (
            <img
              src={makeLogoSrc}
              alt={defaultMake}
              style={styles.makeLogo}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}

          <h1 style={styles.title}>{pageTitle}</h1>
        </div>

        <div style={styles.accentLine} />

        <p style={styles.sub}>Browse our current selection. Use filters to narrow down your options</p>

        {/* Filters */}
        <div style={styles.filters}>
          {!hideMakeFilter && (
            <div style={styles.field}>
              <label style={styles.label}>Make</label>
              <select
                value={makeFilter}
                onChange={(e) => setMakeFilter(e.target.value)}
                style={styles.select}
              >
                <option value="">All</option>
                {makes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={styles.select}
            >
              <option value="">All</option>
              <option value="sedan">Sedan</option>
              <option value="coupe">Coupe</option>
              <option value="suv">SUV</option>
              <option value="truck">Truck</option>
              <option value="hatchback">Hatchback</option>
              <option value="minivan">Minivan</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.select}
            >
              <option value="recommended">Recommended</option>
              <option value="priceLow">Price: Low → High</option>
              <option value="priceHigh">Price: High → Low</option>
              <option value="yearNew">Year: Newest</option>
              <option value="milesLow">Mileage: Lowest</option>
            </select>
          </div>

          <button type="button" style={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
        </div>

        {/* Count */}
        <div style={styles.countRow}>
          <span style={styles.count}>{filtered.length} vehicle(s)</span>
        </div>

        {/* Cards */}
        <div style={styles.grid}>
          {filtered.map((car) => (
            <div key={car.id} style={styles.card}>
              <div style={styles.imgWrap}>
                <img
                  src={car.image}
                  alt={car.model}
                  style={styles.img}
                  onError={(e) => {
                    // Prevent infinite onError loops
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = PLACEHOLDER_IMG;
                  }}
                />
              </div>

              <div style={styles.cardBody}>
                <div style={styles.carTitle}>
                  {car.year} {car.make} {car.model}
                </div>

                <div style={styles.metaRow}>
                  <span style={styles.badge}>{car.type.toUpperCase()}</span>
                  <span style={styles.miles}>
                    {car.mileage.toLocaleString()} miles
                  </span>
                </div>

                <div style={styles.price}>${car.price.toLocaleString()}</div>

                <Link to={`/car/${car.id}`} style={styles.detailsBtn}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div style={styles.empty}>No vehicles found.</div>
        )}
      </div>
    </div>
  );
}

/* ================== STYLES ================== */

const styles = {
  page: {
  background:
    "linear-gradient(180deg, #f8fbff 0%, #ffffff 60%, #fff5f6 100%)",
  color: "#0f172a",
},

  container: {
    width: "min(1100px, calc(100% - 32px))",
    margin: "0 auto",
    padding: "28px 0 60px",
  },

  navRow: {
    display: "flex",
    gap: 14,
    marginBottom: 10,
  },

  backLink: {
  fontSize: 14,
  fontWeight: 800,
  color: "#0284c7",
  textDecoration: "none",

  padding: "8px 16px",
  borderRadius: 999,

  background: "#dbeafe",

  display: "inline-flex",
  alignItems: "center",
  gap: 6,

  boxShadow: "0 4px 10px rgba(14,165,233,0.15)",
},

  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  makeLogo: {
    height: 28,
    width: 60,
    objectFit: "contain",
  },

  title: {
    margin: 0,
    fontSize: 34,
    fontWeight: 900,
  },

  accentLine: {
    width: 86,
    height: 4,
    background: "linear-gradient(to right, #0ea5e9, #f43f5e)",
    borderRadius: 999,
    margin: "10px 0 16px",
  },

  sub: {
    marginBottom: 18,
    opacity: 0.75,
    fontWeight: 600,
  },

filters: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 12,
  padding: 16,
  borderRadius: 18,

  background: "linear-gradient(90deg, #e7f0fb 0%, #f7eaf1 100%)",
  boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
},

  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  label: {
    fontSize: 12,
    fontWeight: 900,
    opacity: 0.7,
  },

  select: {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.16)",
  background: "#fff",
  fontWeight: 700,
},

  resetBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.16)",
    background: "#fff",  
    fontWeight: 900,
    cursor: "pointer",
  },

  countRow: {
    margin: "14px 0 10px",
  },

  count: {
    fontWeight: 800,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
  },

  card: {
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#fff",
  },

  imgWrap: {
    height: 160,
    background: "#e5e7eb",
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  cardBody: {
    padding: 14,
  },

  carTitle: {
    fontWeight: 900,
    marginBottom: 8,
  },

  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },

  badge: {
    padding: "4px 10px",
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12,
  },

  miles: {
    fontSize: 12,
    opacity: 0.7,
    fontWeight: 800,
  },

  price: {
    marginTop: 10,
    fontWeight: 900,
    fontSize: 20,
  },

  detailsBtn: {
    marginTop: 12,
    display: "block",
    textAlign: "center",
    padding: "10px 12px",
    borderRadius: 12,
    background: "#0ea5e9",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 900,
  },

  empty: {
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    fontWeight: 800,
  },
};