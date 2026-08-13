const bookingQueue = require("../queues/bookingQueue");

async function testQueue() {
  const job = await bookingQueue.add(
    "test-delayed-job",
    {
      message: "This job should run after 30 seconds",
    },
    {
      delay: 30 * 1000,
    }
  );

  console.log("Delayed job created:", job.id);

  await bookingQueue.close();
}

testQueue();