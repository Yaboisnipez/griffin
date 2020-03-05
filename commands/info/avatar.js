const { RichEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["icon","av", "pfp"],
  category: "info",
  usage: "g!avatar @user",
  description: "Sends tells about your avatar",
  run: (client, message, bot, args, db) => {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.RichEmbed()
      .setColor("#00ffff")
      .setAuthor(user.username)
      .setImage(user.avatarURL)
      .setFooter(
        `COMMAND REQ. BY ${message.author.username}`,
        ` ${message.author.displayAvatarURL}`
      );

    message.channel.send(avatarEmbed);
  }
};
