const Discord = require("discord.js");
const db = require("quick.db");
const { OWNERID } = require("./config.js")
module.exports = {
  name: "addmoney",
  category: "economy",
  aliases: ["am", "add"],
  usage: "add or am @user (amount)",
  description: "Sends an epic meme",
  run: async (client, message, args, config) => {
    let owner = OWNERID;
    if (message.author.id === owner) {
      let user = message.mentions.members.first() || message.author;

      if (isNaN(args[1])) return;
      db.add(`money_${user.id}`, args[1]);
      let bal = await db.fetch(`money_${user.id}`);

      let moneyEmbed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `<:white_check_mark:618736570337591296> Added ${
            args[1]
          } coins\n\nNew Balance: ${bal}`
        );
      message.channel.send(moneyEmbed);
    }
  }
};