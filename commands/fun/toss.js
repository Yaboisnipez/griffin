const Discord = module.require('discord.js');
const { RichEmbed } = require("discord.js");

var coins = [
  "HEADS",
  "TAILS",
  "TAILS",
  "HEADS",
  "HEADS",
  "TAILS",
  "HEADS",
  "TAILS",
]

module.exports = {
    name: "toss",
    category: "fun",
    description: "TOSSES A COINS",
  run: async (client, message, args, bot) => {
    if (!args[0]) return message.reply("Plase ask a full question heads/tails!");

    let result = Math.floor(Math.random() * coins.length); // here you tried to use "replies", your array is called fortunes so I changed that
    let question = args
      .slice()
      .join(
        " "
      ); /* Since you're slicing the first argument off, you're most likely not getting the entire question. 
                                                E.G: "!8ball hello does this work" becomes "does this work" 
   */
    let ballembed = new Discord.RichEmbed()
      .setAuthor(message.author.tag)
      .setColor("#03f4fc")
      .addField("YOU GOT", question)
      .addField("BOT TOSSED THE COIN AND GOT", coins[result]);

    message.channel.send(ballembed);
    // Here you were missing the closing curly braces to the run function as well as the closing curly braces to the module.exports.
  }
};

