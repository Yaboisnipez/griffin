const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "daily",
  category: "economy",
  usage: "USAGE !work",
  description: "Returns user information",

  run: async (bot, message, args) => {let user = message.author;

    let timeout = 86400000;
    let amount = 500 + Math.floor(Math.random() * 100 - 200);

    let daily = await db.fetch(`daily_${user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));

      let timeEmbed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `
        );
      message.channel.send(timeEmbed);
    } else {
      let moneyEmbed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `<:white_check_mark:618736570337591296> You've collected your daily reward of ${amount} coins`
        );
      message.channel.send(moneyEmbed);
      db.add(`money_${user.id}`, amount);
      db.set(`daily_${user.id}`, Date.now());
    }
  }
};
