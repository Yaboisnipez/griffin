// you cant have empty files, its going to throw an errorSkip
const { RichEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bans a user from the guild!",
  usage: "g!ban",
  category: "moderation",
  accessableby: "Administrators",
  aliases: ["b", "banish", "remove"],
  run: async (bot, message, args) => {
    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "You do not have permission to perform this command!"
      );

    let banMember =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!banMember)
      return message.channel.send("Please provide a user to ban!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given!";

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "I dont have permission to perform this command"
      );

    // banMember
    //   .send(
    //      `Hello, you have been banned from ${message.guild.name} for: ${reason}`
    //   )
    message.guild.ban(banMember, { days: 1, reason: reason });

    message.channel.send(`**${banMember.user.tag}** has been banned`);

    let embed = new RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField("Moderation:", "ban")
      .addField("Mutee:", banMember.user.username)
      .addField("Moderator:", message.author.username)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt.toLocaleString());

    //let sChannel = message.guild.channels.find(c => c.name === "tut-modlogs");
    //  sChannel.send(embed);
  }
};
