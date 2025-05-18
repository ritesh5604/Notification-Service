const express = require("express");
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { sendNotification, getUserNotifications } = notificationController;


router.post("/send-notification", sendNotification);

router.get("/users/:id/notifications", getUserNotifications);

module.exports = router;
