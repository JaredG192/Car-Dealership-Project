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

  // MODAL
  const [showAddModal, setShowAddModal] = useState(false);

  // NEW CAR FORM
  const [newCar, setNewCar] = useState({
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
  });

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
  const handleDelete = async (id, type) => {
  if (!window.confirm("Mark this request as complete?")) return;
  await deleteRequest(id, type);
  const data = await getRequests();
  setRequests(data);
};

  // LOAD USER
 useEffect(() => {
  const storedUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (!storedUser) {
    window.location.href = "#/login";
    return;
  }

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
  const loadRequests = async () => {
    const data = await getRequests();
    setRequests(data);
  };
  loadRequests();
}, []);

  // ADD CAR
  const addCar = async (e) => {
    e.preventDefault();

    const carToAdd = {
      id: Math.floor(Math.random() * 1000000),
      ...newCar,
    };

    const { data, error } = await supabase
      .from("vehicles")
      .insert([carToAdd]);

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Car added successfully!");

    setNewCar({
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
    });

    document.body.classList.remove("modal-open");
    setShowAddModal(false);

    fetchCars();
  };

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

  if (user === null) {
  return <h2>Loading...</h2>;
}

  const getId = (car) => car.id;

  // FILTER REQUESTS
  const filteredRequests = requests.filter((r) => {
    if (requestFilter === "all") return true;
    return r.type === requestFilter;
  });

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

        <p className="dashboard-role">
          Role: {user.role}
        </p>

        {/* CUSTOMER REQUESTS */}
        <div className="section">

          <h2 className="section-title">
            Customer Requests
          </h2>

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
                    onClick={() => handleDelete(r.id, r.type)}
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

          <h2 className="section-title">
            Inventory
          </h2>

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

              <button
                className="new-car-btn"
                onClick={() => {
                  document.body.classList.add("modal-open");
                  setShowAddModal(true);
                }}
              >
                New Car
              </button>

            </div>
          )}

          {/* MODAL */}
          {showAddModal && (
            <div className="modal-overlay">

              <div className="add-car-modal">

                <div className="modal-header">

                  <h2>Add New Car</h2>

                  <button
                    className="close-modal-btn"
                    onClick={() => {
                      document.body.classList.remove("modal-open");
                      setShowAddModal(false);
                    }}
                  >
                    ✕
                  </button>

                </div>

                <form
                  className="add-car-form"
                  onSubmit={addCar}
                >

                  <input
                    type="text"
                    placeholder="Make"
                    value={newCar.make}
                    onChange={(e) =>
                      setNewCar({
                        ...newCar,
                        make: e.target.value,
                      })
                    }
                    required
                  />

                  <input
                    type="text"
                    placeholder="Model"
                    value={newCar.model}
                    onChange={(e) =>
                      setNewCar({
                        ...newCar,
                        model: e.target.value,
                      })
                    }
                    required
                  />

                  <input
                    type="number"
                    placeholder="Year"
                    value={newCar.year}
                    onChange={(e) =>
                      setNewCar({
                        ...newCar,
                        year: e.target.value,
                      })
                    }
                    required
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={newCar.price}
                    onChange={(e) =>
                      setNewCar({
                        ...newCar,
                        price: e.target.value,
                      })
                    }
                    required
                  />

                  <input
                    type="number"
                    placeholder="Mileage"
                    value={newCar.mileage}
                    onChange={(e) =>
                      setNewCar({
                        ...newCar,
                        mileage: e.target.value,
                      })
                    }
                    required
                  />

                  <input
                    type="text"
                    placeholder="Type (SUV, Sedan, Truck...)"
                    value={newCar.type}
                    onChange={(e) =>
                      setNewCar({
                        ...newCar,
                        type: e.target.value,
                      })
                    }
                    required
                  />

                  <input
                    type="text"
                    placeholder="Engine"
                    value={newCar.engine}
                    onChange={(e) =>
                      setNewCar({
                        ...newCar,
                        engine: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Drivetrain"
                    value={newCar.drivetrain}
                    onChange={(e) =>
                      setNewCar({
                        ...newCar,
                        drivetrain: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Horsepower"
                    value={newCar.hp}
                    onChange={(e) =>
                      setNewCar({
                        ...newCar,
                        hp: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Torque"
                    value={newCar.torque}
                    onChange={(e) =>
                      setNewCar({
                        ...newCar,
                        torque: e.target.value,
                      })
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
                    Add Car
                  </button>

                </form>

              </div>

            </div>
          )}

          <div className="inventory-grid">

  {cars.length === 0 ? (
    <p className="empty-message">
      Nothing available.
    </p>
  ) : (
    cars.map((car) => {
      const id = getId(car);

      return (
        <div
          key={id}
          className="inventory-card"
        >

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

          <p>
            ${(car.price || 0).toLocaleString()}
          </p>

          {car.status === "sold" && (
            <span className="sold-badge">
              SOLD
            </span>
          )}

          {car.status === "removed" && (
            <span className="removed-badge">
              REMOVED
            </span>
          )}

          {car.status === "available" && (
            <button
              className="sold-btn"
              onClick={() => markAsSold(id)}
            >
              Mark as Sold
            </button>
          )}

          {user.role === "manager" &&
            car.status === "sold" && (
              <button
                className="undo-btn"
                onClick={() => undoSold(id)}
              >
                Undo Sold
              </button>
            )}

          {user.role === "manager" &&
            car.status === "removed" && (
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
    })
  )}
          </div>
        </div>

      </div>
    </section>
  );
}