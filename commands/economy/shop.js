const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "shop",
  category: "economy",
  aliases: ["store", "s"],
  description: "shows shop",
  run: async (client, message, args) => {
    let shopembed = new Discord.RichEmbed()
      .setTitle("Griffin-Bot Shop")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/650333041025351731/679913958790266940/shop.png"
      )
      .setDescription("Here are some cool shop items.")
      .addField(
        "** **",
        "\n\n**PHONE <:phone:680028837563990021>**\nDescription : `buy phone to get notified for level up or rob.`\nPRICE : <:gbuck:672423515022163978> 25000" +
          "\n\n**BACPACK <:backpack:679911496867905562>**\nDescription : `buy backpack to get more items if you have backpack you'll see more items in shop.`\nPRICE : <:gbuck:672423515022163978> 10000" +
          "\n\n**CHIPS <:chips:680041819467546655>**\nDescription : `buy chips and use it to get a coupon ` <:coupon:680044697321734172> ` to earn random money.`\nPRICE : <:gbuck:672423515022163978> 500"
      )
      .setColor("#FF00DC")
      .setFooter(`${message.author.tag}`)
      .setTimestamp();
    message.channel.send(shopembed);
  }
};
