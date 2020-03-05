const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "deposit",
  category: "economy",
  aliases: ["dep", "d"],
  usage: "USAGE g!deposit <amount>",
  description: "Returns user information",

  run: async (bot, message, args) => {
    let user = message.author;
    if (args[0].includes("-"))
      return message.channel.send("lol these tricks won't work");
    if (args[0].includes("."))
      return message.channel.send("lol these tricks won't work");

    let member = db.fetch(`money_${user.id}`);
    let member2 = db.fetch(`bank_${user.id}`);

    if (args[0] == "all") {
      let money = await db.fetch(`money_${user.id}`);
      let bank = await db.fetch(`bank_${user.id}`);
      let embedbank = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          "<:Cross:618736602901905418> You don't have any money to deposit"
        );

      if (money === 0) return message.channel.send(embedbank);

      db.add(`bank_${user.id}`, money);
      db.subtract(`money_${user.id}`, money);
      let embed5 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `<:white_check_mark:618736570337591296> You have deposited all your coins into your bank`
        );
      message.channel.send(embed5);
    } else {
      let embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Specify an amount to deposit`);

      if (!args[0]) {
        return message.channel.send(embed2).catch(err => console.log(err));
      }

      let embed4 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have that much money`);

      if (member < args[0]) {
        return message.channel.send(embed4);
      }

      let embed5 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You have deposited ${args[0]} coins into your bank`);

      message.channel.send(embed5);
      db.add(`bank_${user.id}`, args[0]);
      db.subtract(`money_${user.id}`, args[0]);
    }
  }
};
