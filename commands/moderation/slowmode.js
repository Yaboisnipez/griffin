module.exports = {
  name: "slowmode",
  usage: "slowmode <time>",
  category: "moderation",
  description: "sets slowmode of current channel",

  run: async (client, message, args, guilds) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("You need to be an admin to do that");
    const Discord = require("discord.js");
    const ms = require("ms");

    let channel = message.channel;
    let time = args[0];
    //  if (!args[0]) return
    //    message.channel.send("what??? enter a number");
    //    if (isNaN(args[0])) return;
    //    message.channel.send("time should be a number");

    //   if (args[0].includes("-")) return;
    //   message.channel.send("no i'll not");

    //   if (args[0].includes(".")) return;
    //   message.channel.send("no i'll not");

    let stime = ms(time);
    channel.setRateLimitPerUser(stime).then(() => {
      message.channel.send("Done");
    });
  }
};
