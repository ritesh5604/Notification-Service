const Notification = require('../models/Notification');
const { publishToQueue } = require('../rabbitmq');



const sendNotification = async (req, res) => {
  const { userId, message, type } = req.body;

  // Validate notification type
  if (!['email', 'sms', 'in-app'].includes(type)) {
    return res.status(400).json({ error: 'Invalid notification type' });
  }

  try {
    // 1. Create notification with status "pending"
    const notification = new Notification({
      userId,
      message,
      type,
      status: 'pending',
    });

    await notification.save();

    console.log(`📥 Notification (${notification._id}) queued for processing...`);


    publishToQueue({ userId, message, type, notificationId: notification._id });


    // 3. Respond immediately
    res.status(202).json({
      message: 'Notification queued for processing',
      notificationId: notification._id,
    });

  } catch (err) {
    console.error('🚨 Error saving notification:', err.message);
    res.status(500).json({ error: 'Failed to queue notification' });
  }
};

const getUserNotifications = async (req, res) => {
  const userId = req.params.id;

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    console.error('🚨 Error fetching notifications:', err.message);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

// ✅ Export both functions
module.exports = {
  sendNotification,
  getUserNotifications,
};
