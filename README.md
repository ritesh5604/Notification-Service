# 📢 Notification Service

A scalable full-stack notification system supporting **email, SMS, and in-app notifications**. Built with **asynchronous processing via RabbitMQ**, MongoDB for persistence, and a modern React UI featuring **dark mode** and **mobile responsiveness** — all styled using **vanilla CSS**.

---

## 📌 Features

- 🔁 **Send notifications** (email, SMS, in-app) via REST API  
- 📬 **Retrieve user notifications**  
- 🧵 **Async processing** using RabbitMQ  
- ✅ **Retry logic**: up to 3 attempts on failure  
- 💾 **MongoDB** stores all notifications with status:
  - `pending`
  - `sent`
  - `failed`
- 🎨 Frontend:
  - Send/view notifications
  - Dark mode UI
  - Fully responsive using CSS media queries

---

## 🛠️ Tech Stack

### 🔙 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- RabbitMQ (`amqplib`)

### 🌐 Frontend
- React.js
- Vanilla CSS
- Vite (for fast dev & build)

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/ritesh5604/Notification-Service.git
cd Notification-Service
2. Install Backend Dependencies
bash
Copy
Edit
npm install
3. Set Up Environment Variables
Create a .env file in the root directory:

env
Copy
Edit
MONGO_URI=mongodb://localhost:27017/notifications
PORT=5000
RABBITMQ_URL=amqp://localhost
4. Start RabbitMQ Server
Make sure RabbitMQ is installed and running locally.

bash
Copy
Edit
rabbitmq-server
5. Run the Message Consumer
bash
Copy
Edit
node consumer.js
6. Start the Backend Server
bash
Copy
Edit
npm run dev
# OR
node server.js
7. Run the Frontend (from subfolder)
bash
Copy
Edit
cd notification-frontend
npm install
npm run dev
📬 API Endpoints
➤ Send Notification
POST /notifications

Request Body:

json
Copy
Edit
{
  "userId": "ritesh134",
  "type": "sms",        // Options: "email", "sms", "in-app"
  "message": "Hey!"
}
Response:

json
Copy
Edit
{
  "message": "Notification queued for processing",
  "notificationId": "6650f81d1b3e22a849b47c7f"
}
➤ Get User Notifications
GET /notifications/users/:userId/notifications

Returns all notifications for a specific user.

🔁 Queue & Retry Logic
New notification created with status pending

Pushed to RabbitMQ queue: notification_queue

consumer.js picks and processes it

Simulated delivery (randomized success/failure)

Retries up to 3 times on failure

Final status updated to either sent or failed

📦 Sample Console Output
bash
Copy
Edit
🚀 Server running on port 5000
✅ MongoDB connected
✅ Connected to RabbitMQ

📥 Notification queued...
📤 Published to queue:
{
  userId: 'ritesh134',
  message: 'Hey!',
  type: 'sms',
  notificationId: ObjectId('...')
}

🐰 Waiting for messages in queue: notification_queue
📱 Sending SMS to user ritesh134: Hey!
✅ Notification sent
🌐 Frontend Features
🔄 Real-time status updates (e.g., "Sending...", "Fetched 3 notifications")

🌙 Dark mode toggle

📱 Mobile responsive via CSS media queries

📤 Send notifications (choose type: email/SMS/in-app)

📥 View notification history by user

The frontend is located in the notification-frontend directory inside the project.

✅ Assumptions
Email/SMS sending is simulated via console logs

userId is treated as a basic string

RabbitMQ and MongoDB must be installed and running locally

🚀 Deployment
Backend:
Deploy to Render, Railway, or Heroku (add RabbitMQ plugin if needed)

Frontend:
Deploy to Vercel, Netlify, or GitHub Pages (works with Vite)

Make sure to:

Add your .env file on the host platform

Set the correct API base URL in the frontend

🙌 Why This Project Stands Out
This project mimics real-world notification architecture with:

Async queue-based processing

Retry logic

Notification status tracking

Clean separation of backend, consumer, and UI responsibilities

Great for learning, interviews, and portfolio showcasing!

🤝 Contributing
Pull requests are welcome! For suggestions, bugs, or improvements, open an issue and let's collaborate.

© 2025 Ritesh Pandey — Notification Service built using Node.js, MongoDB, RabbitMQ, React, and good old Vanilla CSS.

