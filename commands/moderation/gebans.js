const { RichEmbed, Discord } = require("discord.js");

module.exports = {
  name: "getbans",
  description: "Bans a user from the guild!",
  usage: "!ban",
  category: "moderation",
  accessableby: "Administrators",
  aliases: ["bans", "bu", "banned"],
  run: async (bot, message, args) => {
    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "You do not have permission to perform this command!"
      );

    // Fetch bans in guild
    let guild = message.guild;
    guild;
    message.guild
      .fetchBans()
      .then(banned => {
        let list = banned.map(user => user.tag).join("\n");

        // Make sure if the list is too long to fit in one message, you cut it off appropriately.
        if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;

        message.channel.send(`**${banned.size} users are banned:**\n${list}`);
      })
      .catch(console.error);
  }
};
