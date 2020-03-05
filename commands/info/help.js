const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { embed } = require("../../functioning.js");
const fs = require("fs");
module.exports = {
  name: "help",
  aliases: ["h"],
  category: "info",
  description: "Returns all commands, or one specific command info",
  usage: "help <optional command name>",
  run: async (client, message, args) => {
    const pJson = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));
    if (!pJson[message.guild.id]) pJson[message.guild.id] = { prefix: "g!" };
    let data = {
      prefix: pJson[message.guild.id].prefix
    }; // ini biar asik aja
    let PREFIX = data.prefix;
    const embed = new Discord.MessageEmbed()
      .setTitle("HELP")
      .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
      .setDescription("You have 1 minute to react on an emoji to see its info")
      .addField(
        "💰 ECONOMY",
        "Economy commands are used to see your level earnings its just like a game."
      )
      .addField("😜 FUN", "Funny and memey commands")
      .addField(
        "ℹ️ INFORMATION/UTILITY",
        "Some common info and utility commands"
      )
      .addField(
        "🚨 MODERATION",
        "Moderator commands are to make your server an amazing and desciplined"
      )
      .addField("PREFIX IN THIS SERVER", `**${PREFIX}**\n`)
      .setFooter("NOTE : You can react one time.")
      .setColor("#00FFFF");

    const economy = new Discord.MessageEmbed()
      .setTitle("ECONOMY COMMANDS")
      .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
      .setDescription(
        " balance, beg, daily, deposit, level, pay, profile, rob, shop, top, withdraw, work, slots"
      )
      .setFooter("GRIFFIN-BOT")
      .setColor("#D4B41C");

    const fun = new Discord.MessageEmbed()
      .setTitle("FUN COMMANDS")
      .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
      .setDescription(
        "8ball, anime, hug, hunger, kiss, love, math, meme, punch, rps, say, toss"
      )
      .setFooter("GRIFFIN-BOT")
      .setColor("yellow");

    const info = new Discord.MessageEmbed()
      .setTitle("INFO/UTILITY COMMANDS")
      .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
      .setDescription(
        "userinfo, avatar, botinfo, createinv, help, instagram, ping, roleinfo, uptime, weather"
      )
      .setFooter("GRIFFIN-BOT")
      .setColor("blue");

    const moderation = new Discord.MessageEmbed()
      .setTitle("MODERATION COMMANDS")
      .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
      .setDescription(
        "addrole, ban, clear, getbans, kick, mute, poll, setprefix, tempmute"
      )
      .setFooter("GRIFFIN-BOT")
      .setColor("#FF0000");

    message.channel.send(embed).then(msg => {
      msg
        .react("💰")
        .then(() => msg.react("😜"))
        .then(() => msg.react("🚨"))
        .then(() => msg.react("ℹ️"));

      const filter = (reaction, user) => {
        return (
          ["💰", "😜", "🚨", "ℹ️"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      msg
        .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
        .then(collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === "💰") {
            msg.edit(economy);
            msg.clearReactions();
          } else if (reaction.emoji.name === "😜") {
            msg.edit(fun);
            msg.clearReactions();
          } else if (reaction.emoji.name === "ℹ️") {
            msg.edit(info);
            msg.clearReactions();
          } else if (reaction.emoji.name === "🚨") {
            msg.edit(moderation);
            msg.clearReactions();
          }
        })
        .catch(collected => {
          message.reply("Time up for help command.");
        });
    });

    //let help = embed("help", "test", "test", "#00ff22");
    // message.channel.send(help);

    function getCMD(client, message, input) {
      const embed = new Discord.RichEmbed();

      const cmd =
        client.commands.get(input.toLowerCase()) ||
        client.commands.get(client.aliases.get(input.toLowerCase()));

      let info = `No information found for command **${input.toLowerCase()}**`;

      if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
      }

      if (cmd.name) info = `**Command name**: ${cmd.name}`;
      if (cmd.aliases)
        info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
      if (cmd.description) info += `\n**Description**: ${cmd.description}`;
      if (cmd.usage) {
        info += `\n**Usage**: ${PREFIX + cmd.name}`;
        embed.setFooter(`Griffin-Bot`);
      }
      return message.channel.send(
        embed.setColor("#ff2052").setDescription(info)
      );
    }
  }
};
//
//
