import React, { useState, useEffect } from "react";
import "./EmployeeDashboard.css";

export default function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    setCars([
      { id: 1, name: "Toyota Camry", sold: false },
      { id: 2, name: "Honda Civic", sold: false },
      { id: 3, name: "Ford Mustang", sold: false }
    ]);
  }, []);

  if (!user) return <h2>Unauthorized</h2>;

  const markAsSold = (id) => {
    setCars((prev) =>
      prev.map((car) =>
        car.id === id ? { ...car, sold: true } : car
      )
    );
  };

  const removeCar = (id) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  const addCar = () => {
    const newCar = {
      id: Date.now(),
      name: "New Car",
      sold: false
    };
    setCars((prev) => [...prev, newCar]);
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
          <button className="add-car-btn" onClick={addCar}>
            + Add Car
          </button>
        )}

        <div className="inventory-grid">
          {cars.map((car) => (
            <div key={car.id} className="inventory-card">
              <h3>{car.name}</h3>

              {car.sold && (
                <span className="sold-badge">SOLD</span>
              )}

              {!car.sold && (
                <button
                  className="sold-btn"
                  onClick={() => markAsSold(car.id)}
                >
                  Mark as Sold
                </button>
              )}

              {user.role === "manager" && (
                <button
                  className="remove-btn"
                  onClick={() => removeCar(car.id)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}