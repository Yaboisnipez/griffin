const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "rob",
  category: "economy",
  description: "rob someone money very badly",
  usage: " do g!rob to steal someone money",

  run: async (bot, message, args) => {
    if (message.author.id !== "507965365930950657")
      return message.channel.send("This command has been disabled temporarily");

    let user = message.mentions.members.first();
    let targetuser = await db.fetch(`money_${user.id}`);
    let author = await db.fetch(`rob_${message.author.id}`);
    let author2 = await db.fetch(`money_${message.author.id}`);

    let timeout = 300000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));

      let timeEmbed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `You have already robbed someone\n\nTry again in ${time.minutes}m ${time.seconds}s `
        );
      message.channel.send(timeEmbed);
    } else {
      let moneyEmbed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `You need atleast 200 coins in your pocket to rob someone`
        );

      if (author2 < 200) {
        return message.channel.send(moneyEmbed);
      }
      let moneyEmbed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `${user.user.username} does not have anything you can rob`
        );
      if (targetuser < 0) {
        return message.channel.send(moneyEmbed2);
      }

      let random;
      let vip = await db.fetch(`bronze_${user.id}`);
      //   if (vip === true) random = Math.floor(Math.random() * 200) + 1;
      if (vip === null) random = Math.floor(Math.random() * targetuser) + 1;

      let embed = new Discord.RichEmbed()
        .setDescription(`You robbed ${user} and got away with ${random} coins`)
        .setColor("#FFFFFF");
      message.channel.send(embed);

      db.subtract(`money_${user.id}`, random);
      db.add(`money_${user.id}`, random);
      db.set(`rob_${user.id}`, Date.now());
    }
  }
};
