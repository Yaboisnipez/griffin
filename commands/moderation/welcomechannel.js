const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "welcomechannel",
  description: "set welcome channel your server",
  usage: "welcome channel",
  aliases: ["wc"],
  run: async (client, message, args) => {
    let guild = message.guild;

    let gchannel = db.get(`gChannel_${guild.id}`);
    let channel = message.content.replace(/\D/g,'')
    if (!channel) return message.channel.send("Can't find the chann");
    db.set(`gChannel_${guild.id}`, `${channel}`);
    message.channel.send(
      `new welcome channel of this server is <#${channel}>`
    );
  }
};
