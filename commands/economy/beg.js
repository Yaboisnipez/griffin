const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "beg",
  category: "economy",
  description: "beg for money",

  run: async (bot, message, args) => {
    let user = message.author;

    let timeout = 180000;
    let amount = 5;

    let beg = await db.fetch(`beg_${user.id}`);

    if (beg !== null && timeout - (Date.now() - beg) > 0) {
      let time = ms(timeout - (Date.now() - beg));

      let timeEmbed = new Discord.RichEmbed()
        .setColor("#ffc302")
        .setDescription(
          `You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `
        );
      message.channel.send(timeEmbed);
    } else {
      let moneyEmbed = new Discord.RichEmbed()
        .setColor("#ffc302")
        .setDescription(
          `:white_check_mark: You've begged and received ${amount} coins`
        );
      message.channel.send(moneyEmbed);
      db.add(`money_${user.id}`, amount);
      db.set(`beg_${user.id}`, Date.now());
    }
  }
};
