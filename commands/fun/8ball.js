const Discord = module.require("discord.js");
const { Token } = require("../../config.js");

var fortunes = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes - definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
  "Maybe",
  "That is sure as hell.",
  "Fire.",
  "Indeed.",
  "Try to be usefull.",
  "Watch the birds.",
  "Gold.",
  "Answer is uncertain.",
  "You are the master of your life",
  "Maybe no.",
  "We can not be never sure.",
  "As you wish.",
  "Eat less, move more.",
  "Better ask yourself.",
  "Just do it.",
  "Sorry, but this is really stupid question.",
  "Try to be usefull.",
  "Water.",
  "We can not be never sure.",
  "You already know the Answer.",
  "Very bad idea.",
  "Never.",
  "Maybe yes.",
  "Mabye no."
];

module.exports = {
  name: "8ball",
  category: "fun",
  description: "Ans your queston",

  run: async (bot, message, args) => {
    if (!args[0]) return message.reply("Plase ask a full question!");

    let result = Math.floor(Math.random() * fortunes.length); // here you tried to use "replies", your array is called fortunes so I changed that
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
      .addField("Question", question)
      .addField("Answer", fortunes[result]);

    message.channel.send(ballembed);
    // Here you were missing the closing curly braces to the run function as well as the closing curly braces to the module.exports.
  }
};
