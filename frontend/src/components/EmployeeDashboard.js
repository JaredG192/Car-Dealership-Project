
import React, { useState, useEffect, useCallback } from "react";
import "./EmployeeDashboard.css";
import { getRequests, deleteRequest } from "../services/serviceRequests";
import { supabase } from "../supabaseClient";

export default function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [statusFilter, setStatusFilter] = useState("available");
  const [editingCar, setEditingCar] = useState(null);

  const [requests, setRequests] = useState([]);
  const [requestFilter, setRequestFilter] = useState("all");

  const [showAddModal, setShowAddModal] = useState(false);

  const emptyCar = {
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    type: "",
    engine: "",
    drivetrain: "",
    hp: "",
    torque: "",
    transmission: "",
    status: "available",
  };

  const [newCar, setNewCar] = useState(emptyCar);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "#/login";
  };

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

  const handleDelete = async (id, type) => {
    if (!window.confirm("Mark this request as complete?")) return;

    await deleteRequest(id, type);
    const data = await getRequests();
    setRequests(data);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!storedUser) {
      window.location.href = "#/login";
      return;
    }

    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user) {
      fetchCars();
    }
  }, [user, fetchCars]);

  useEffect(() => {
    const loadRequests = async () => {
      const data = await getRequests();
      setRequests(data);
    };

    loadRequests();
  }, []);

  const openNewCarModal = () => {
    setEditingCar(null);
    setNewCar(emptyCar);
    document.body.classList.add("modal-open");
    setShowAddModal(true);
  };

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    setShowAddModal(false);
    setEditingCar(null);
    setNewCar(emptyCar);
  };

  const saveCar = async (e) => {
    e.preventDefault();

    if (editingCar) {
      const { error } = await supabase
        .from("vehicles")
        .update(newCar)
        .eq("id", editingCar.id);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Vehicle updated successfully!");
    } else {
      const carToAdd = {
        id: Math.floor(Math.random() * 1000000),
        ...newCar,
      };

      const { error } = await supabase
        .from("vehicles")
        .insert([carToAdd]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Car added successfully!");
    }

    closeModal();
    fetchCars();
  };

  const editCar = (car) => {
    setEditingCar(car);
    setNewCar({
      make: car.make || "",
      model: car.model || "",
      year: car.year || "",
      price: car.price || "",
      mileage: car.mileage || "",
      type: car.type || "",
      engine: car.engine || "",
      drivetrain: car.drivetrain || "",
      hp: car.hp || "",
      torque: car.torque || "",
      transmission: car.transmission || "",
      status: car.status || "available",
    });

    document.body.classList.add("modal-open");
    setShowAddModal(true);
  };

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

  const permanentlyDeleteCar = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this vehicle? This cannot be undone."
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting vehicle: " + error.message);
      return;
    }

    alert("Vehicle permanently deleted.");
    fetchCars();
  };

  if (user === null) {
    return <h2>Loading...</h2>;
  }

  const filteredRequests = requests.filter((r) => {
    if (requestFilter === "all") return true;
    return r.type === requestFilter;
  });

  return (
    <section className="dashboard-page">
      <div className="dashboard-container">
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
                <div key={`${r.type}-${r.id}`} className="request-card">
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
                    {r.type === "consultation" ? "Consultation" : "Question"}
                  </span>

                  <button
                    className="complete-btn"
                    onClick={() => handleDelete(r.id, r.type)}
                  >
                    Complete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

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

              <button className="new-car-btn" onClick={openNewCarModal}>
                New Car
              </button>
            </div>
          )}

          {showAddModal && (
            <div className="modal-overlay">
              <div className="add-car-modal">
                <div className="modal-header">
                  <h2>{editingCar ? "Edit Vehicle" : "Add New Car"}</h2>

                  <button className="close-modal-btn" onClick={closeModal}>
                    ✕
                  </button>
                </div>

                <form className="add-car-form" onSubmit={saveCar}>
                  <input
                    type="text"
                    placeholder="Make"
                    value={newCar.make}
                    onChange={(e) =>
                      setNewCar({ ...newCar, make: e.target.value })
                    }
                    required
                  />

                  <input
                    type="text"
                    placeholder="Model"
                    value={newCar.model}
                    onChange={(e) =>
                      setNewCar({ ...newCar, model: e.target.value })
                    }
                    required
                  />

                  <input
                    type="number"
                    placeholder="Year"
                    value={newCar.year}
                    onChange={(e) =>
                      setNewCar({ ...newCar, year: e.target.value })
                    }
                    required
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={newCar.price}
                    onChange={(e) =>
                      setNewCar({ ...newCar, price: e.target.value })
                    }
                    required
                  />

                  <input
                    type="number"
                    placeholder="Mileage"
                    value={newCar.mileage}
                    onChange={(e) =>
                      setNewCar({ ...newCar, mileage: e.target.value })
                    }
                    required
                  />

                  <input
                    type="text"
                    placeholder="Type"
                    value={newCar.type}
                    onChange={(e) =>
                      setNewCar({ ...newCar, type: e.target.value })
                    }
                    required
                  />

                  <input
                    type="text"
                    placeholder="Engine"
                    value={newCar.engine}
                    onChange={(e) =>
                      setNewCar({ ...newCar, engine: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Drivetrain"
                    value={newCar.drivetrain}
                    onChange={(e) =>
                      setNewCar({ ...newCar, drivetrain: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Horsepower"
                    value={newCar.hp}
                    onChange={(e) =>
                      setNewCar({ ...newCar, hp: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Torque"
                    value={newCar.torque}
                    onChange={(e) =>
                      setNewCar({ ...newCar, torque: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Transmission"
                    value={newCar.transmission}
                    onChange={(e) =>
                      setNewCar({
                        ...newCar,
                        transmission: e.target.value,
                      })
                    }
                  />

                  <button type="submit">
                    {editingCar ? "Save Changes" : "Add Car"}
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="inventory-grid">
            {cars.length === 0 ? (
              <p className="empty-message">Nothing available.</p>
            ) : (
              cars.map((car) => (
                <div key={car.id} className="inventory-card">
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

                  {user.role === "manager" && car.status === "available" && (
                    <button
                      className="edit-btn"
                      onClick={() => editCar(car)}
                    >
                      Edit
                    </button>
                  )}

                  {car.status === "available" && (
                    <>
                      <button
                        className="sold-btn"
                        onClick={() => markAsSold(car.id)}
                      >
                        Mark as Sold
                      </button>

                      {user.role === "manager" && (
                        <button
                          className="remove-btn"
                          onClick={() => removeCar(car.id)}
                        >
                          Remove
                        </button>
                      )}
                    </>
                  )}

                  {user.role === "manager" && car.status === "sold" && (
                    <>
                      <button
                        className="undo-btn"
                        onClick={() => undoSold(car.id)}
                      >
                        Undo Sold
                      </button>

                      <button
                        className="remove-btn"
                        onClick={() => removeCar(car.id)}
                      >
                        Remove
                      </button>
                    </>
                  )}

                  {user.role === "manager" &&
                    car.status === "removed" && (
                      <>
                        <button
                          className="restore-btn"
                          onClick={() => restoreCar(car.id)}
                        >
                          Restore
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => permanentlyDeleteCar(car.id)}
                        >
                          Delete Permanently
                        </button>
                      </>
                    )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

