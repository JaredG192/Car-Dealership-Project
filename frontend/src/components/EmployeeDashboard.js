import React, { useState, useEffect } from "react";
import "./EmployeeDashboard.css";
import { getRequests, deleteRequest } from "../services/serviceRequests";

export default function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [statusFilter, setStatusFilter] = useState("available");
  const [showForm, setShowForm] = useState(false);

  // REQUESTS
  const [requests, setRequests] = useState([]);
  const [requestFilter, setRequestFilter] = useState("all");

  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    type: ""
  });

  const API_BASE = "http://localhost:5001";

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "#/login";
  };

  // FETCH CARS
  const fetchCars = () => {
    let url = `${API_BASE}/api/vehicles`;

    if (user?.role === "manager") {
      url += `?status=${statusFilter}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const vehicles = data.vehicles || data;
        setCars(Array.isArray(vehicles) ? vehicles : []);
      })
      .catch((err) => console.error(err));
  };

  // DELETE REQUEST
  const handleDelete = (id) => {
    if (!window.confirm("Mark this request as complete?")) return;
    deleteRequest(id);
    setRequests(getRequests());
  };

  // LOAD USER
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  // LOAD CARS
  useEffect(() => {
    if (user) fetchCars();
  }, [user, statusFilter]);

  // LOAD REQUESTS
  useEffect(() => {
    setRequests(getRequests());
  }, []);

  if (!user) return <h2>Unauthorized</h2>;

  const getId = (car) => car.id;

  // FILTER REQUESTS
  const filteredRequests = requests.filter((r) => {
    if (requestFilter === "all") return true;
    return r.type === requestFilter;
  });

  // CAR ACTIONS
  const markAsSold = (id) => {
    fetch(`${API_BASE}/api/vehicles/${id}/sell`, {
      method: "PUT",
    }).then(fetchCars);
  };

  const undoSold = (id) => {
    fetch(`${API_BASE}/api/vehicles/${id}/sell`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "available" }),
    }).then(fetchCars);
  };

  const removeCar = (id) => {
    fetch(`${API_BASE}/api/vehicles/${id}`, {
      method: "DELETE",
    }).then(fetchCars);
  };

  const restoreCar = (id) => {
    fetch(`${API_BASE}/api/vehicles/${id}/sell`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "available" }),
    }).then(fetchCars);
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">
          <h1>
            {user.role === "manager"
              ? "Manager Dashboard"
              : "Employee Dashboard"}
          </h1>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <p className="dashboard-role">Role: {user.role}</p>

        {/* ===================== */}
        {/* CUSTOMER REQUESTS */}
        {/* ===================== */}
        <div className="section">
          <h2 className="section-title">Customer Requests</h2>

          <div className="filter-buttons">
            <button
              className={requestFilter === "all" ? "active" : ""}
              onClick={() => setRequestFilter("all")}
            >
              All
            </button>

            <button
              className={requestFilter === "consultation" ? "active" : ""}
              onClick={() => setRequestFilter("consultation")}
            >
              Consultations
            </button>

            <button
              className={requestFilter === "question" ? "active" : ""}
              onClick={() => setRequestFilter("question")}
            >
              Questions
            </button>
          </div>

          <div className="requests-grid">
            {filteredRequests.length === 0 ? (
              <p>No requests yet.</p>
            ) : (
              filteredRequests.map((r) => (
                <div key={r.id} className="request-card">
                  <h3>{r.name}</h3>
                  <p>{r.email}</p>
                  <p>{r.message}</p>

                  <span className={`request-type ${r.type}`}>
                    {r.type === "consultation" ? "Consultation" : "Question"}
                  </span>

                  <button
                    className="complete-btn"
                    onClick={() => handleDelete(r.id)}
                  >
                    Complete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ===================== */}
        {/* INVENTORY */}
        {/* ===================== */}
        <div className="section">
          <h2 className="section-title">Inventory</h2>

          {user.role === "manager" && (
            <>
              <button
                className="add-car-btn"
                onClick={() => setShowForm(true)}
              >
                + Add Car
              </button>

              <div className="filter-buttons">
                <button
                  className={statusFilter === "available" ? "active" : ""}
                  onClick={() => setStatusFilter("available")}
                >
                  Available
                </button>

                <button
                  className={statusFilter === "sold" ? "active" : ""}
                  onClick={() => setStatusFilter("sold")}
                >
                  Sold
                </button>

                <button
                  className={statusFilter === "removed" ? "active" : ""}
                  onClick={() => setStatusFilter("removed")}
                >
                  Removed
                </button>
              </div>
            </>
          )}

          <div className="inventory-grid">
            {cars.map((car) => {
              const id = getId(car);

              return (
                <div key={id} className="inventory-card">
                  {car.image && (
                    <img
                      src={`${process.env.PUBLIC_URL}${car.image}`}
                      alt={car.model}
                      className="car-img"
                    />
                  )}

                  <h3>
                    {car.year} {car.make} {car.model}
                  </h3>

                  <p>${(car.price || 0).toLocaleString()}</p>

                  {car.status === "sold" && (
                    <span className="sold-badge">SOLD</span>
                  )}

                  {car.status === "removed" && (
                    <span className="removed-badge">REMOVED</span>
                  )}

                  {car.status === "available" && (
                    <button
                      className="sold-btn"
                      onClick={() => markAsSold(id)}
                    >
                      Mark as Sold
                    </button>
                  )}

                  {user.role === "manager" && car.status === "sold" && (
                    <button
                      className="undo-btn"
                      onClick={() => undoSold(id)}
                    >
                      Undo Sold
                    </button>
                  )}

                  {user.role === "manager" && car.status === "removed" && (
                    <button
                      className="restore-btn"
                      onClick={() => restoreCar(id)}
                    >
                      Restore
                    </button>
                  )}

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

      </div>
    </section>
  );
}