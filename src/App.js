import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "./config";

function App() {
  const [name, setName] = useState(""); // New state for Name
  const [rollNo, setRollNo] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState(null);

const API = "https://ead-backend-7ra3.onrender.com";


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!rollNo.trim()) {
      setMessage({ type: "danger", text: "Roll No is required" });
      return;
    }

    try {
      const res = await fetch(`${API}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rollNo, gender, skills }), // include name here
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Submission failed");

      setMessage({ type: "success", text: "Submitted successfully" });

      // Reset form
      setName("");
      setRollNo("");
      setGender("");
      setSkills("");
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: err.message });
    }
  };

  return (
    <div className="container py-4">
      <div className="card mx-auto" style={{ maxWidth: 500 }}>
        <div className="card-body">
          <h4 className="card-title mb-3">User Info Form</h4>

          {message && (
            <div className={`alert alert-${message.type}`}>{message.text}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Roll Number"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>

          <div className="mt-3 text-muted text-center">
            {/* <p>All rights reserved &#xA9; 2025 CBIT-IT @kgr.</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

