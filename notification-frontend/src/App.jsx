import React, { useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("email");
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState("");

  const API_BASE = "http://localhost:5000";

  const sendNotification = async () => {
    if (!userId || !message) {
      alert("Please enter User ID and Message");
      return;
    }
    setStatus("Sending notification...");
    try {
      const res = await fetch(`${API_BASE}/notifications/send-notification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message, type }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(`✅ Notification queued with ID: ${data.notificationId}`);
      } else {
        setStatus(`❌ Error: ${data.message || "Failed to send"}`);
      }
    } catch (err) {
      setStatus("❌ Network error");
    }
  };

 const fetchNotifications = async () => {
  if (!userId) {
    alert("Enter User ID to fetch notifications");
    return;
  }
  setStatus("Fetching notifications...");
  try {
    const res = await fetch(`${API_BASE}/notifications/users/${userId}/notifications`);
    const data = await res.json();
    console.log("📥 Raw data from backend:", data);

    let notifs = [];
    if (Array.isArray(data)) {
      notifs = data;
    } else if (Array.isArray(data.notifications)) {
      notifs = data.notifications;
    }

    setNotifications(notifs);
    setStatus(`Fetched ${notifs.length} notifications`);
  } catch (err) {
    console.error("❌ Error fetching:", err);
    setStatus("Network error");
  }
};


  return (
    <div
      style={{
        maxWidth: 600,
        margin: "3rem auto",
        padding: "2rem",
        background: "#1e1e2f",
        borderRadius: "12px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#f1f1f1",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#9bd0ff" }}>
        🚀 Notification Dashboard
      </h2>

      <label>User ID:</label>
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={inputStyle}
      />

      <label>Notification Type:</label>
      <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle}>
        <option value="email">Email</option>
        <option value="sms">SMS</option>
        <option value="in-app">In-App</option>
      </select>

      <label>Message:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        style={{ ...inputStyle, resize: "vertical" }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
        <button style={buttonPrimary} onClick={sendNotification}>Send Notification</button>
        <button style={buttonSecondary} onClick={fetchNotifications}>Fetch Notifications</button>
      </div>

      {status && <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>{status}</p>}

      {notifications.length > 0 && (
        <>
          <h3 style={{ color: "#85e0b9" }}>📜 User Notifications:</h3>
          <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.6" }}>
            {notifications.map((notif) => (
              <li key={notif._id}>
                <b>[{notif.type}]</b> {notif.message} — <span style={{ color: "#6affb0" }}>{notif.status}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  margin: "0.5rem 0 1.2rem",
  borderRadius: "6px",
  border: "1px solid #444",
  backgroundColor: "#2a2a40",
  color: "#f1f1f1",
};

const buttonPrimary = {
  padding: "0.75rem",
  backgroundColor: "#2980b9",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const buttonSecondary = {
  ...buttonPrimary,
  backgroundColor: "#27ae60",
};

export default App;
