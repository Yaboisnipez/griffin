const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
module.exports = {
  name: "withdraw",
  category: "economy",
  aliases: ["wd", "with", "w"],
  usage: "withdraw <amount>",
  description: "withdraw amount from your bank",

  run: async (bot, message, args) => {
    let user = message.author;
    if (args[0].includes("-"))
      return message.channel.send("lol these tricks won't work");
    if (args[0].includes("."))
      return message.channel.send("lol these tricks won't work");

    let member = db.fetch(`money_${user.id}`);
    let member2 = db.fetch(`bank_${user.id}`);

    if (args[0] == "all") {
      let money = await db.fetch(`bank_${user.id}`);
      db.subtract(`bank_${user.id}`, money);
      db.add(`money_${user.id}`, money);
      let embed5 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `:white_check_mark: You have withdrawn all your coins from your bank`
        );
      message.channel.send(embed5);
    } else {
      let embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Specify an amount to withdraw`);

      if (!args[0]) {
        return message.channel.send(embed2);
      }
      let embed4 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have that much money in the bank`);

      if (member2 < args[0]) {
        return message.channel.send(embed4);
      }

      let embed5 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `:white_check_mark: You have withdrawn ${
            args[0]
          } coins from your bank`
        );

      message.channel.send(embed5);
      db.subtract(`bank_${user.id}`, args[0]);
      db.add(`money_${user.id}`, args[0]);
    }
  }
};
