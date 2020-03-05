const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "top",
  category: "economy",
  aliases: ["t", "lb", "rich"],
  description: "Sends an epic meme",

  run: async (bot, message, args) => {
    const rawData = db
      .all()
      .filter(data => data.ID.startsWith(`money`))
      .sort((a, b) => b.data - a.data);
    rawData.length = 5;
           let data = rawData
          .map(
            (data, i) =>
              `**${++i}. ${data.data.toLocaleString()}** <:gbuck:672423515022163978> **<@${
                data.ID.split("_")[1]
              }>**`
          )
          .join("\n")

    const embed = new Discord.RichEmbed()
      .setAuthor(`Here are some richest users`, message.guild.iconURL)
      .setColor("#00ffff")
      .setDescription(data)
      .setFooter(bot.user.tag, bot.user.displayAvatarURL)
      .setTimestamp();
    message.channel.send(embed);
  }
};
