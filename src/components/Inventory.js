import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Inventory
 * - Displays vehicle cards with filtering + sorting
 * - Supports URL filter: /inventory?type=suv
 * - Supports manufacturer pages via props:
 *    <Inventory defaultMake="Toyota" hideMakeFilter />
 */
export default function Inventory({ defaultMake = "", hideMakeFilter = false }) {
  const location = useLocation();
  const base = process.env.PUBLIC_URL;

  // Local placeholder so the app works offline & on GitHub Pages.
  // Put a file at: public/inventory/placeholder.jpg
  const PLACEHOLDER_IMG = `${base}/inventory/placeholder.jpg`;

  // Manufacturer logos (put these files in: public/brands/)
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

  /** Mock inventory data (replace with API later) */
  const cars = useMemo(
    () => [
      // Toyota (4)
      { id: 1, make: "Toyota", model: "Camry", year: 2021, price: 18500, mileage: 45000, type: "sedan", image: `${base}/inventory/camry.jpeg` },
      { id: 2, make: "Toyota", model: "Corolla", year: 2020, price: 16200, mileage: 52000, type: "sedan", image: `${base}/inventory/corolla.jpg` },
      { id: 3, make: "Toyota", model: "GR86", year: 2022, price: 28900, mileage: 18000, type: "coupe", image: `${base}/inventory/gr86.jpg` },
      { id: 4, make: "Toyota", model: "RAV4", year: 2019, price: 21900, mileage: 64000, type: "suv", image: `${base}/inventory/rav4.jpg` },

      // Honda (4)
      { id: 5, make: "Honda", model: "Civic", year: 2020, price: 16900, mileage: 52000, type: "sedan", image: `${base}/inventory/civic.jpg` },
      { id: 6, make: "Honda", model: "Accord", year: 2019, price: 19800, mileage: 61000, type: "sedan", image: `${base}/inventory/accord.jpg` },
      { id: 7, make: "Honda", model: "CR-V", year: 2021, price: 24900, mileage: 36000, type: "suv", image: `${base}/inventory/crv.jpg` },
      { id: 8, make: "Honda", model: "HR-V", year: 2018, price: 17900, mileage: 72000, type: "suv", image: `${base}/inventory/hrv.jpg` },

      // Nissan (3)
      { id: 9, make: "Nissan", model: "Altima", year: 2021, price: 18900, mileage: 47000, type: "sedan", image: `${base}/inventory/altima.jpg` },
      { id: 10, make: "Nissan", model: "Sentra", year: 2020, price: 15900, mileage: 54000, type: "sedan", image: `${base}/inventory/sentra.jpg` },
      { id: 11, make: "Nissan", model: "Rogue", year: 2019, price: 20900, mileage: 66000, type: "suv", image: `${base}/inventory/rouge.jpg` }, // keep if your file is actually "rouge.jpg"

      // Subaru (3)
      { id: 12, make: "Subaru", model: "Outback", year: 2019, price: 21900, mileage: 61000, type: "suv", image: `${base}/inventory/outback.jpg` },
      { id: 13, make: "Subaru", model: "Forester", year: 2020, price: 22900, mileage: 52000, type: "suv", image: `${base}/inventory/forester.jpg` },
      { id: 14, make: "Subaru", model: "Impreza", year: 2018, price: 14900, mileage: 78000, type: "hatchback", image: `${base}/inventory/impreza.jpg` },

      // Mazda (3)
      { id: 15, make: "Mazda", model: "CX-5", year: 2022, price: 25900, mileage: 21000, type: "suv", image: `${base}/inventory/cx5.jpg` },
      { id: 16, make: "Mazda", model: "Mazda3", year: 2021, price: 19900, mileage: 33000, type: "hatchback", image: `${base}/inventory/mazda3.jpg` },
      { id: 17, make: "Mazda", model: "MX-5 Miata", year: 2020, price: 27900, mileage: 26000, type: "coupe", image: `${base}/inventory/miata.jpg` },

      // Kia (3)
      { id: 18, make: "Kia", model: "Soul", year: 2021, price: 17900, mileage: 39000, type: "hatchback", image: `${base}/inventory/soul.jpg` },
      { id: 19, make: "Kia", model: "Sportage", year: 2019, price: 19900, mileage: 62000, type: "suv", image: `${base}/inventory/sportage.jpg` },
      { id: 20, make: "Kia", model: "Telluride", year: 2020, price: 31900, mileage: 49000, type: "suv", image: `${base}/inventory/telluride.jpg` },

      // Ford (3)
      { id: 21, make: "Ford", model: "F-150", year: 2018, price: 24900, mileage: 74000, type: "truck", image: `${base}/inventory/f150.jpg` },
      { id: 22, make: "Ford", model: "Mustang", year: 2019, price: 28900, mileage: 52000, type: "coupe", image: `${base}/inventory/mustang.jpg` },
      { id: 23, make: "Ford", model: "Escape", year: 2020, price: 20900, mileage: 58000, type: "suv", image: `${base}/inventory/escape.jpg` },

      // Chevrolet (2)
      { id: 24, make: "Chevrolet", model: "Malibu", year: 2020, price: 17400, mileage: 61000, type: "sedan", image: `${base}/inventory/malibu.jpg` },
      { id: 25, make: "Chevrolet", model: "Silverado 1500", year: 2019, price: 27900, mileage: 69000, type: "truck", image: `${base}/inventory/silverado.jpg` },
    ],
    [base]
  );

  /** Read initial type from URL: /inventory?type=suv */
  const urlType = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("type") || "";
  }, [location.search]);

  // Filters / Sort state
  const [makeFilter, setMakeFilter] = useState(defaultMake);
  const [typeFilter, setTypeFilter] = useState(urlType);
  const [sortBy, setSortBy] = useState("recommended");

  // Keep make locked when using manufacturer pages
  useEffect(() => {
    if (defaultMake) setMakeFilter(defaultMake);
  }, [defaultMake]);

  // Dropdown options
  const makes = useMemo(() => {
    const set = new Set(cars.map((c) => c.make));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [cars]);

  // Apply filtering + sorting
  const filtered = useMemo(() => {
    let list = cars;

    if (makeFilter) list = list.filter((c) => c.make === makeFilter);
    if (typeFilter) list = list.filter((c) => c.type === typeFilter);

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
  }, [cars, makeFilter, typeFilter, sortBy]);

  const pageTitle = defaultMake ? `${defaultMake} Inventory` : "Inventory";
  const makeLogoSrc = defaultMake ? makeLogoMap[defaultMake] : "";

  const handleReset = () => {
    // On manufacturer pages, don't clear the make
    if (!defaultMake) setMakeFilter("");
    setTypeFilter("");
    setSortBy("recommended");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Title row (logo + title) */}
        <div style={styles.titleRow}>
          {makeLogoSrc && (
            <img
              src={makeLogoSrc}
              alt={`${defaultMake} logo`}
              style={styles.makeLogo}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}

          <h1 style={styles.title}>{pageTitle}</h1>
        </div>

        <div style={styles.accentLine} />

        <p style={styles.sub}>
          Browse our current selection. Use filters to narrow down your options.
        </p>

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

        {/* Results count */}
        <div style={styles.countRow}>
          <span style={styles.count}>{filtered.length} vehicle(s)</span>
        </div>

        {/* Vehicle cards */}
        <div style={styles.grid}>
          {filtered.map((car) => (
            <div key={car.id} style={styles.card}>
              <div style={styles.imgWrap}>
                <img
                  src={car.image}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  style={styles.img}
                  onError={(e) => {
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

                <Link to={`/inventory/${car.id}`} style={styles.detailsBtn}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={styles.empty}>
            No vehicles match your filters. Try Reset.
          </div>
        )}
      </div>
    </div>
  );
}

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

  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "nowrap",      
    minWidth: 0,              
  },

  makeLogo: {
    height: 28,               
    width: 60,                
    objectFit: "contain",
    flexShrink: 0,           
  },
  title: { margin: 0, fontSize: 34, fontWeight: 900, letterSpacing: "-0.3px", minWidth: 0, lineHeight: 1.1,},

  accentLine: {
    width: 86,
    height: 4,
    background: "linear-gradient(to right, #0ea5e9, #f43f5e)",
    borderRadius: 999,
    margin: "10px 0 16px",
  },

  sub: {
    marginTop: 0,
    marginBottom: 18,
    color: "rgba(15, 23, 42, 0.75)",
    fontWeight: 600,
    lineHeight: 1.6,
  },

  filters: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
    alignItems: "end",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 16,
    padding: 14,
    background:
      "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(244,63,94,0.06))",
  },

  field: { display: "flex", flexDirection: "column", gap: 6 },

  label: {
    fontSize: 12,
    fontWeight: 900,
    opacity: 0.7,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },

  select: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.16)",
    background: "#fff",
    fontWeight: 800,
    outline: "none",
  },

  resetBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.16)",
    background: "#fff",
    fontWeight: 900,
    cursor: "pointer",
  },

  countRow: { marginTop: 14, marginBottom: 10 },
  count: { fontWeight: 800, color: "rgba(15, 23, 42, 0.75)" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
  },

  card: {
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.10)",
    boxShadow: "0 12px 26px rgba(0,0,0,0.08)",
    background: "#fff",
  },

  imgWrap: {
    width: "100%",
    height: 160,
    overflow: "hidden",
    background: "#e5e7eb",
  },

  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },

  cardBody: { padding: 14 },
  carTitle: { fontWeight: 900, fontSize: 16, marginBottom: 8 },

  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },

  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(15,23,42,0.04)",
    fontWeight: 900,
    fontSize: 12,
  },

  miles: { fontWeight: 800, fontSize: 12, opacity: 0.7 },
  price: { marginTop: 10, fontWeight: 900, fontSize: 20 },

  detailsBtn: {
    marginTop: 12,
    display: "inline-block",
    width: "100%",
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
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(244,63,94,0.06)",
    fontWeight: 800,
  },
};