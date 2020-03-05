module.exports = {
  name: "ping",
  category: "info",
  description: "this is just a test",
  run: async (client, message) => {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong, Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    
  }
}