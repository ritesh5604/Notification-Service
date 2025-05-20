const amqp = require('amqplib');

let channel, connection;

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue('notification_queue');
    console.log('✅ Connected to RabbitMQ');
  } catch (error) {
    console.error('❌ Failed to connect to RabbitMQ:', error);
  }
}

function publishToQueue(data) {
  channel.sendToQueue('notification_queue', Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
  console.log('📤 Message published to queue:', data);
}

module.exports = {
  connectRabbitMQ,
  publishToQueue,
};
