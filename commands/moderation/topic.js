module.exports = {
  name: "topic",
  usage: "topic <text>",
  category: "moderation",
  description: "sets topic of current channel",

  run: async (client, message, args, guilds) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("You need to be an admin to do that");
    const Discord = require("discord.js");

    let channel = message.channel;
    if (!args)
      return message.channel.send(
        "what??? enter something so i can set it as topic"
      );

    var tu = `${args}`;
    var topic = tu.replace(/,/g, " ")
    channel.setTopic(`${topic}`).then(() => {
      message.channel.send("Done");
    });
  }
};
