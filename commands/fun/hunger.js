const { RichEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
  name: "hunger",
  category: "fun",
  description: "HUNGRY!! USE THINS COMMAND",
  run: async (client, message, args) => {
    // In this array,
    // you can put the subreddits you want to grab memes from
    const subReddits = ["food"];
    // Grab a random property from the array
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    // Get a random image from the subreddit page
    const img = await randomPuppy(random);
    const embed = new RichEmbed()
      .setColor("#ff2050")
      .setDescription("HERE IS A TREAT FOR YOU")
      .setImage(img);

    message.channel.send(embed);
  }
};
