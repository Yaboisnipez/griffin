const math = require("mathjs"); // npm i mathjs --save
const Discord = require("discord.js");

      
module.exports = {
    name: "math",
    description: "Tells you the result of math problem.",
    usage: "<math-problem>",
    category:"fun",
    accessableby: "Members",
    aliases: ["calc"],
    run: async (client, message, args ) => {
    if (!args[0]) return message.channel.send("Please input a calculation.");

    let resp;
    try {
      resp = math.evaluate(args.join(" "));
    } catch (e) {
      return message.channel.send("Sorry, please input a valid calculation.");
    }

    const embed = new Discord.RichEmbed()
      .setColor(0xffffff)
      .setTitle("Math Calculation")
      .addField("Input", `\`\`\`js\n${args.join("")}\`\`\``)
      .addField("Output", `\`\`\`js\n${resp}\`\`\``);

    message.channel.send(embed);
  }
};

