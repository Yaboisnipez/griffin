
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "balance",
  category: "economy",
  aliases: ["bal"],
  usage: "g!bal <optional mention>",
  description: "Shows your balance/mentioned user's balance",

  run: async (bot, message, args, utils) => {

    let user = message.mentions.members.first() || message.author;

    let bal = await db.fetch(`money_${user.id}`);

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${user.id}`);
    if (bank === null) bank = 0;

    let moneyEmbed = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`**${user}'s Balance**\n\nPocket: ${bal}\nBank: ${bank}`);
    message.channel.send(moneyEmbed);
  }
};
