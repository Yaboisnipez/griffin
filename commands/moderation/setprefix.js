module.exports = {
  name: "setprefix",
  aliases: ["sp"],
  usage: "g!sp ",
  category: "moderation",
  description: "Allows people to make polls",
  accessableby: "Moderators",

  run: async (bot, message, args, data) => {
    const fs = require("fs");

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("You needed permission **ADMINISTRATOR**");
    const pJson = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));
    if (!pJson[message.guild.id]) pJson[message.guild.id] = { prefix: "g!" };
    let nprefix = args[0];
    let prefix = data.prefix;
    if (!nprefix)
      return message.channel.send(
        `To set a new prefix do: ${prefix}setprefix <new prefix>`
      );
    if (nprefix.length > 5)
      return message.channel.send(
        `Isn't it extra long??? it must be with 5 letters..`
      );

    pJson[message.guild.id].prefix = nprefix;
    fs.writeFile("./prefix.json", JSON.stringify(pJson, null, 2), Err => {
      if (Err) console.error(Err);
    });
    await message.channel.send(
      `The new prefix of this server is **${nprefix}**`
    );
  }
};
