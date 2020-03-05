const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "pay",
  aliases: ["give"],
  category: "economy",
  usage: "give @user <amount>",
  description: "Returns user information",

  run: async (bot, message, args) => {
    let user = message.mentions.members.first();
  
    if (args[1].includes("-"))
      return message.channel.send("lol these tricks won't work");
    if (args[1].includes("."))
      return message.channel.send("lol these tricks won't work");

    let member = db.fetch(`money_${message.author.id}`);

    let embed1 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`Please Mention someone to pay`);

    if (!user) {
      return message.channel.send(embed1);
    }
    let embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`Please Specify an amount to pay`);

    if (!args[1]) {
      return message.channel.send(embed2);
    }
    let embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`Lol You can't pay someone negative money`);

//   if (message.content.includes("-")) {
//      return message.channel.send(embed3);
//    }
    let embed4 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`Lol You don't have that much money`);

    if (member <= args[1]) {
      return message.channel.send(embed4);
    }

    let embed5 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(
        `<:white_check_mark:618736570337591296> You have payed ${
          user.user.username
        } ${args[1]} coins`
      );

    message.channel.send(embed5);
    db.add(`money_${user.id}`, args[1]);
    db.subtract(`money_${message.author.id}`, args[1]);
  }
};
