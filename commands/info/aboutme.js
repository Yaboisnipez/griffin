const Discord = require("discord.js");

module.exports = {
  name: "userinfo",
  category: "info",
  description: "gives info of mentioned user",
  usage: "userinfo <optional mention>",
  aliases: ["ui"],

  run: async (client, message, args) => {
    let inline = true;
    let status = {
      online: "<:online:656127026150768654> Online",
      idle: "<:idle:656126919649001472>  Idle",
      dnd: "<:dnd:656126974044930059> Do Not Disturb",
      offline: "<:offline:656126866775736351> Offline/Invisible"
    };

    let member =
      message.mentions.members.first() ||
      message.guild.members.get(args[0]) ||
      message.member;
    let target = message.mentions.users.first() || message.author;

    let uiembed = new Discord.RichEmbed()
      //.setAuthor(member.user.username)
      .setThumbnail(target.displayAvatarURL)
      .setColor("#00ff22")
      .addField("Full Username", `${member.user.tag}`, inline)
      .addField("ID", member.user.id, inline)
      .addField(
        "Nickname",
        `${member.nickname !== null ? `Nickname: ${member.nickname}` : "None"}`,
        true
      )

      .addField(
        "Status",
        `${status[member.user.presence.status]}`,
        inline,
        true
      )
      .addField(
        "Playing",
        `${
          member.user.presence.game
            ? `🎮 ${member.user.presence.game.name}`
            : "Playing Nothing"
        }`,
        inline,
        true
      )
      .addField(
        "Roles",
        `${member.roles
          .filter(r => r.id !== message.guild.id)
          .map(roles => `\`${roles.name}\``)
          .join(" **|** ") || "No Roles"}`,
        true
      )
      .addField("Joined Discord At", member.user.createdAt)
      .setFooter(`Information about ${member.user.username}`)
      .setTimestamp();

    message.channel.send(uiembed);
  }
};
