const Discord = module.require("discord.js");

module.exports = {
  name: "anime",
  category: "fun",
  description: "Get a random anime picture",
  run: async (client, message, args) => {
    const animesf = require("snekfetch");

    let res = await animesf.get("http://api.cutegirls.moe/json");
    if (res.body.status !== 200) {
      return message.channel.send(
        "An error occurred while processing this command."
      );
    }
    let animepicembed = new Discord.RichEmbed()
      .setColor("#f266f9")
      .setTitle("Anime Picture")
      .setImage(res.body.data.image);

    message.channel.send(animepicembed);
  }
};
