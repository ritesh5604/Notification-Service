// consumer.js
const amqp = require('amqplib');
const mongoose = require('mongoose');
const Notification = require('./models/Notification');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your-db-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// RabbitMQ setup
const queue = 'notification_queue';

async function consume() {
  try {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();

    await channel.assertQueue(queue, { durable: true });

    console.log(`🐰 Waiting for messages in queue: ${queue}`);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        const { userId, message, type, notificationId } = data;

        let attempts = 0;
        const maxAttempts = 3;
        let success = false;

        while (!success && attempts < maxAttempts) {
          try {
            attempts++;

            // Simulate random failure (30% chance)
            if (Math.random() < 0.3) {
              throw new Error('Simulated failure');
            }

            // Simulate sending logic
            if (type === 'email') {
              console.log(`📧 [${notificationId}] Sending EMAIL to user ${userId}: ${message}`);
            } else if (type === 'sms') {
              console.log(`📱 [${notificationId}] Sending SMS to user ${userId}: ${message}`);
            } else {
              console.log(`🔔 [${notificationId}] In-app notification stored.`);
            }

            await Notification.findByIdAndUpdate(notificationId, { status: 'sent' });
            success = true;
            channel.ack(msg); // Acknowledge message after success

          } catch (error) {
            console.log(`❌ [${notificationId}] Attempt ${attempts} failed: ${error.message}`);
            if (attempts === maxAttempts) {
              await Notification.findByIdAndUpdate(notificationId, { status: 'failed' });
              channel.ack(msg); // Acknowledge message even on final failure
            }
          }
        }
      }
    }, { noAck: false });

  } catch (err) {
    console.error('🚨 Consumer error:', err.message);
  }
}

consume();
