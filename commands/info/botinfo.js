const { RichEmbed } = require("discord.js");
const { version } = require("../../package.json");
const { OWNERID } = require("../../config.js");
const { duration } = require("./uptime.js");

module.exports = {
  name: "botinfo",
  description: "",
  usage: "",
  category: "info",
  accessableby: "Members",
  aliases: ["bi"],
  run: async (bot, message, args) => {
    function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (1000 * 60)) % 60).toString();
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
      const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
      return `${days.padStart(1, "0")} days, ${hrs.padStart(
        2,
        "0"
      )} hours, ${min.padStart(2, "0")} minutes, ${sec.padStart(
        2,
        "0"
      )} seconds, `;
    }

    let biembed = new RichEmbed()
      .setColor(bot.user.hexColor)
      .setAuthor(bot.user.username, bot.user.displayAvatarURL)
      .setTimestamp()
      .setTitle(`${bot.user.username}'s Info`)
      .setThumbnail(bot.user.displayAvatarURL)
      .addField("**Bot's Name:**", bot.user.username)
      .addField("**Bot Owner:**", OWNERID)
      .addField("**Bot Version:**", version)
      .addField("**Bot ID:**", bot.user.id)
      .addField("**Bot Discriminator:**", bot.user.discriminator)
      .addField("**Bot Status:**", "Online ✅")
      .addField("**Developing Language**", "discord.js (JavaScript)")
      .addField("**Guild Count:**", bot.guilds.size)
      .addField("**Users Count:**", bot.users.size)
      .addField(
        "**INVITE BOT TO YOUR SERVER:**",
        `[INVITE ME](https://discordapp.com/api/oauth2/authorize?client_id=650312432262184960&permissions=0&scope=bot)`
      )
      .addField("**Bot was born at:**", bot.user.createdAt)
      // .addField("**Memeory Usage:**", `${(process.memoryUsage().heapUsed / 1024 / 1024 ).toFixes(2)} MB`)
      .addField(
        "**Commands:**",
        `${bot.commands.size} Successfully Developed commands!`
      )
      .setFooter(bot.user.username, bot.user.displayAvatarURL);
    message.channel.send(biembed);
  }
};
