import React, { useState, useEffect } from "react";
import "./EmployeeDashboard.css";

export default function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [showSold, setShowSold] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);

  const API_BASE = "http://localhost:5000";

  // Fetch cars
  const fetchCars = () => {
    let url = `${API_BASE}/api/vehicles`;

    if (user?.role === "manager") {
      if (showRemoved) {
        url += "?status=removed";
      } else if (showSold) {
        url += "?status=sold";
      }
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);

        const vehicles = data.vehicles || data;
        setCars(Array.isArray(vehicles) ? vehicles : []);
      })
      .catch((err) => console.error(err));
  };

  // Load user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  // Fetch cars when filters change
  useEffect(() => {
    if (user) {
      fetchCars();
    }
  }, [user, showSold, showRemoved]);

  if (!user) return <h2>Unauthorized</h2>;

  // Always use Supabase id
  const getId = (car) => car.id;

  // Mark as sold
  const markAsSold = (id) => {
    fetch(`${API_BASE}/api/vehicles/${id}/sell`, {
      method: "PUT"
    })
      .then(() => fetchCars())
      .catch((err) => console.error(err));
  };

  // Undo sold
  const undoSold = (id) => {
    fetch(`${API_BASE}/api/vehicles/${id}/sell`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "available" })
    })
      .then(() => fetchCars())
      .catch((err) => console.error(err));
  };

  // Remove (soft delete)
  const removeCar = (id) => {
    fetch(`${API_BASE}/api/vehicles/${id}`, {
      method: "DELETE"
    })
      .then(() => fetchCars())
      .catch((err) => console.error(err));
  };

  // Restore removed car
  const restoreCar = (id) => {
    fetch(`${API_BASE}/api/vehicles/${id}/sell`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "available" })
    })
      .then(() => fetchCars())
      .catch((err) => console.error(err));
  };

  // Add car (placeholder)
  const addCar = () => {
    fetch(`${API_BASE}/api/vehicles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        make: "Toyota",
        model: "New Car",
        year: 2024,
        price: 10000,
        mileage: 0,
        image: "/inventory/placeholder.jpg",
        status: "available"
      })
    })
      .then(() => fetchCars())
      .catch((err) => console.error(err));
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "#/login";
  };

  return (
    <section className="inventory-page">
      <div className="inventory-container">

        <div className="dashboard-header">
          <h1>Inventory Dashboard</h1>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <p className="inventory-role">Role: {user.role}</p>

        {user.role === "manager" && (
          <>
            <button className="add-car-btn" onClick={addCar}>
              + Add Car
            </button>

            {/* SOLD TOGGLE */}
            <button
              className="toggle-btn"
              onClick={() => {
                setShowSold(!showSold);
                setShowRemoved(false);
              }}
            >
              {showSold ? "Show Available Cars" : "Show Sold Cars"}
            </button>

            {/* REMOVED TOGGLE */}
            <button
              className="toggle-btn"
              onClick={() => {
                setShowRemoved(!showRemoved);
                setShowSold(false);
              }}
            >
              {showRemoved ? "Show Available Cars" : "Show Removed Cars"}
            </button>
          </>
        )}

        <div className="inventory-grid">
          {cars.map((car) => {
            const id = getId(car);

            return (
              <div key={id} className="inventory-card">

                {/* IMAGE */}
                {car.image && (
                  <img
                    src={`${process.env.PUBLIC_URL}${car.image}`}
                    alt={car.model}
                    className="car-img"
                  />
                )}

                {/* TITLE */}
                <h3>{car.year} {car.make} {car.model}</h3>

                {/* PRICE */}
                <p>${(car.price || 0).toLocaleString()}</p>

                {/* STATUS BADGES */}
                {car.status === "sold" && (
                  <span className="sold-badge">SOLD</span>
                )}
                {car.status === "removed" && (
                  <span className="removed-badge">REMOVED</span>
                )}

                {/* ACTIONS */}

                {/* Available → can sell */}
                {car.status === "available" && (
                  <button
                    className="sold-btn"
                    onClick={() => markAsSold(id)}
                  >
                    Mark as Sold
                  </button>
                )}

                {/* Sold → can undo */}
                {user.role === "manager" && car.status === "sold" && (
                  <button
                    className="undo-btn"
                    onClick={() => undoSold(id)}
                  >
                    Undo Sold
                  </button>
                )}

                {/* Removed → can restore */}
                {user.role === "manager" && car.status === "removed" && (
                  <button
                    className="restore-btn"
                    onClick={() => restoreCar(id)}
                  >
                    Restore
                  </button>
                )}

                {/* Remove button (not shown for already removed) */}
                {user.role === "manager" && car.status !== "removed" && (
                  <button
                    className="remove-btn"
                    onClick={() => removeCar(id)}
                  >
                    Remove
                  </button>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}