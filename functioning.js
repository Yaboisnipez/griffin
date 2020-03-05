const Discord = require("discord.js");

function embed(title, description, footer, color) {
  new Discord.RichEmbed()
    .setTitle(title)
    .setDescription(description)
    .setFooter(footer)
    .setColor(color);
}
