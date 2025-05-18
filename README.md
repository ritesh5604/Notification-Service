# 📢 Notification Service

A scalable full-stack notification system supporting **email, SMS, and in-app notifications**, built with asynchronous processing using **RabbitMQ**, MongoDB for persistence, and a React frontend UI with **dark mode** and **mobile responsiveness**.

---

## 📌 Features

- **Send notifications** via `POST /notifications` (email, SMS, or in-app)
- **Retrieve user notifications** via `GET /users/:id/notifications`
- Asynchronous handling with **RabbitMQ**
- **Retry logic**: Up to 3 attempts on failure
- **MongoDB** stores all notifications with status:
  - `pending`
  - `sent`
  - `failed`
- Frontend UI to **send** and **view** notifications
  - Professional look
  - **Dark mode**
  - **Mobile-responsive**

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- RabbitMQ (`amqplib`)

### Frontend
- React.js
- TailwindCSS
- Vite (for faster builds)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/notification-service.git
cd notification-service
2. Install Backend Dependencies
bash
Copy
Edit
npm install
3. Set Environment Variables
Create a .env file in the root:

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
5. Run the Consumer
bash
Copy
Edit
node consumer.js
6. Start Backend Server
bash
Copy
Edit
npm run dev
# or
node server.js
7. Run the Frontend (in separate terminal)
bash
Copy
Edit
cd client
npm install
npm run dev
📬 API Endpoints
➤ Send Notification
POST /notifications/send-notification

Request Body:

json
Copy
Edit
{
  "userId": "ritesh134",
  "type": "sms", // email, sms, in-app
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

Returns all notifications for the user.

🔁 Retry & Queue Logic
A new notification is created with status pending.

It is pushed to a RabbitMQ queue (notification_queue).

The consumer.js fetches and processes it asynchronously.

Simulated sending of notifications (with randomized failures).

Retries up to 3 times.

Final status is updated to sent or failed.

📦 Example Console Output
bash
Copy
Edit
🚀 Server running on port 5000
✅ MongoDB connected
✅ Connected to RabbitMQ
📥 Notification (6650...) queued for processing...
📤 Published to queue: {
  userId: 'ritesh134',
  message: 'Hey!',
  type: 'sms',
  notificationId: ObjectId('...')
}
🐰 Waiting for messages in queue: notification_queue
📱 [6650...] Sending SMS to user ritesh134: hey!
✅ Notification sent
🌐 Frontend Features
📱 Mobile responsive

🌙 Dark mode UI

📤 Send Notifications via dropdown (email/SMS/in-app)

📥 Fetch user-specific history

✅ Realtime status feedback (e.g., Sending..., Fetched 3 notifications)

✅ The frontend client is located in the client/ folder and runs independently via Vite.

✅ Assumptions
No real email/SMS APIs; sending is simulated via console logs

userId is a simple identifier string

RabbitMQ must be installed and running locally

MongoDB must be accessible at MONGO_URI

🚀 Deployment
You can deploy the backend and frontend to platforms like:

Backend:
Render

Railway

Heroku (with RabbitMQ add-on)

Frontend:
Vercel

Netlify

GitHub Pages (with minor config)

📝 Ensure environment variables are configured properly on hosting platforms, and backend URL in frontend is updated accordingly.

🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss.