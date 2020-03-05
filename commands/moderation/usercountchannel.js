module.exports = {
  name: "usercountchannel",
  description: "makes a channel that shows how many users are in server",
  category: "moderation",
  usage: "uc #channel",
  aliases: ["uc"],
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("You needed permission **ADMINISTRATOR**");
    let name = args[0];
    let channel = message.guild.channels.find("name", `${name}`);
    if (!channel) return message.channel.send("I cant find that channel");
    let users = message.guild.members.size;
    channel.setName(`USERS : ${users}`);
    message.channel.send("Done");
  }
};
