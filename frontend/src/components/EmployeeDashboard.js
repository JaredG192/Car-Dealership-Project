import React, { useState, useEffect, useCallback } from "react";
import "./EmployeeDashboard.css";
import { getRequests, deleteRequest } from "../services/serviceRequests";
import { supabase } from "../supabaseClient";

export default function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [statusFilter, setStatusFilter] = useState("available");

  // REQUESTS
  const [requests, setRequests] = useState([]);
  const [requestFilter, setRequestFilter] = useState("all");

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "#/login";
  };

  // FETCH CARS
  const fetchCars = useCallback(async () => {
    let query = supabase.from("vehicles").select("*");

    if (user?.role === "manager") {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      setCars([]);
    } else {
      setCars(data || []);
    }
  }, [user, statusFilter]);

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
    if (user) {
      fetchCars();
    }
  }, [user, fetchCars]);

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
  const markAsSold = async (id) => {
    await supabase
      .from("vehicles")
      .update({ status: "sold" })
      .eq("id", id);

    fetchCars();
  };

  const undoSold = async (id) => {
    await supabase
      .from("vehicles")
      .update({ status: "available" })
      .eq("id", id);

    fetchCars();
  };

  const removeCar = async (id) => {
    await supabase
      .from("vehicles")
      .update({ status: "removed" })
      .eq("id", id);

    fetchCars();
  };

  const restoreCar = async (id) => {
    await supabase
      .from("vehicles")
      .update({ status: "available" })
      .eq("id", id);

    fetchCars();
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

        {/* CUSTOMER REQUESTS */}
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

                  <div className="request-details">
                    {r.message
                      ?.split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((line, index) => {
                        if (!line.includes(":")) {
                          return (
                            <p key={index}>
                              <strong>Message:</strong> {line}
                            </p>
                          );
                        }

                        const parts = line.split(":");
                        const label = parts[0];
                        const value = parts.slice(1).join(":");

                        return (
                          <p key={index}>
                            <strong>{label}:</strong> {value}
                          </p>
                        );
                      })}
                  </div>

                  <span className={`request-type ${r.type}`}>
                    {r.type === "consultation"
                      ? "Consultation"
                      : "Question"}
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

        {/* INVENTORY */}
        <div className="section">
          <h2 className="section-title">Inventory</h2>

          {user.role === "manager" && (
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

                  {user.role === "manager" &&
                    car.status !== "removed" && (
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