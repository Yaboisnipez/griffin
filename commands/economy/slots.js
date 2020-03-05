const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "slot",
  aliases: ["slots", "s"],
  usage: "slot <amount>",
  category: "economy",
  description: "slot amount you want can multi upto 3x",
  run: async (client, message, args) => {
    let slots = [
      "<:sc:677787638421258260>",
      "<:sb:677787656981315594>",
      "<:s7:677787621438783498>"
    ];
    let result1 = Math.floor(Math.random() * slots.length);
    let result2 = Math.floor(Math.random() * slots.length);
    let result3 = Math.floor(Math.random() * slots.length);
    let name = message.author.displayName;
    let icon = message.author.displayAvatarURL;
    let multi = Math.floor(Math.random() * 3) + 1;
    let user = message.member;
    let bal = db.fetch(`money_${user.id}`);
    let arg = args[0]
    if (args === "all") arg = bal;
    let wbal = bal + arg * multi;
    let lbal = bal - arg;
    let am = arg * multi;
    //  message.channel.send(slots[result1] + slots[result2] + slots[result3]);
    if (!args[0]) return message.channel.send("Pls input a number to slot");
    if (args[0] > bal)
      return message.channel.send("lol you don't have that much money");
    if (args[0].includes("-"))
      return message.channel.send("lol these tricks won't work");
    if (args[0].includes("."))
      return message.channel.send("lol these tricks won't work");
    if (isNaN(args[0]))
      return message.channel.send(
        "Aren't you trying to crash the system? Send a number"
      );
    if (
      slots[result1] === slots[result2] &&
      slots[result2] === slots[result3]
    ) {
      let embed = new Discord.RichEmbed()
        //  .setFooter("You won!", icon)
        .setDescription(`You won **${am}** <:gbuck:672423515022163978> `)
        .setTitle(":slot_machine: Slots :slot_machine:")
        .addField(
          "Result:",
           slots[result1] + slots[result2] + slots[result3] ,
          true
        )
        .setColor("#00ff22");
      db.add(`money_${user.id}`, am);
      message.channel.send(embed);
    } else {
      let embed2 = new Discord.RichEmbed()
        //.setFooter("You lost!", icon)
        .setDescription(`You lost** ${args[0]}** <:gbuck:672423515022163978>`)
        .setTitle(":slot_machine: Slots :slot_machine:")
        .addField(
          "Result:",
           slots[result1] + slots[result2] + slots[result3],
          true
        )
        .setColor("#ff0000");
      db.set(`money_${user.id}`, lbal);
      message.channel.send(embed2);
    }
  }
};
