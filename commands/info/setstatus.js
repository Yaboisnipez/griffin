module.exports = {
  name: "setstatus",
  category: "info",
  aliases: ["st"],
  usage: "",
  description: "",

  run: async (client, message, args) => {
    const Discord = require("discord.js");
    const log = client.channels.find("id", "677739402826612776");
    let user = message.member.username;
    log.send(`${user} changed bot status to ${args.join}`);

    if (message.member.id !== "507965365930950657")
      return message.reply("only bot owners can do this");
    const db = require("quick.db");
    let status = db.fetch(`status`);
    if (status === null) status = `${client.guilds.size} servers`;
    db.set(`status`, `${args.join(" ")}`);
    message.channel.send(
      `bot's status setted to ${args.join} wait sometime. Bot is rebooting...`
    );
    process.exit(0);
  }
};
