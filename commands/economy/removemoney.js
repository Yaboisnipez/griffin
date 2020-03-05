const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "removemoney",
  category: "economy",
  aliases: ["rm"],
  usage: "USAGE !work",
  description: "Returns user information",

  run: async (bot, message, args) => {
    let ownerID = "507965365930950657";
    if (message.author.id !== ownerID) return;

    let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.subtract(`money_${user.id}`, args[1]);
    let bal = await db.fetch(`money_${user.id}`);

    let moneyEmbed = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(
        `<:white_check_mark:618736570337591296> Removed ${
          args[1]
        } coins\n\nNew Balance: ${bal}`
      );
    message.channel.send(moneyEmbed);
  }
};
