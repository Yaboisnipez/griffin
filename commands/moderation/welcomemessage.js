const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "welcomemessage",
  description: "set welcome channel your server",
  usage: "welcome message",
  aliases: ["wm"],
  run: async (client, message, args) => {
    let guild = message.guild;
    db.set(`welcome_msg_${guild.id}`, args);
    message.channel.send(
      `done`
    );
  }
};
