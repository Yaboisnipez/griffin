module.exports = {
  name: "work",
  category: "economy",
  description: "Sends an epic meme",

  run: async (client, message, args) => {
    const Discord = require("discord.js");
    const ms = require("parse-ms");
    const db = require("quick.db");

    let user = message.author;
    let hrandom = Math.floor(Math.random() * 2000);
    let timeout = 600000 / 2;
    let work = await db.fetch(`work_${user.id}`);

    if (work !== null && timeout - (Date.now() - work) > 0) {
      let time = ms(timeout - (Date.now() - work));

      let timeEmbed = new Discord.RichEmbed()
        .setColor("#ffc302")
        .setDescription(
          `You've already **WORKED** recently\n**WORK** again in ${time.minutes}m ${time.seconds}s`
        );
      message.channel.send(timeEmbed);
    } else {
      db.set(`work_${user.id}`, `${Date.now()}`);
      const embed = new Discord.RichEmbed()
        .setTitle("WORK")
        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
        .setDescription(
          "You have 1 minute to react on an emoji to work on that subject"
        )
        .addField(
          "JOBS",
          "You can work as given jobs to react with there number.\n**Developer** 1️⃣\n**Youtuber** 2️⃣\n**Bank Manager** 3️⃣"
        )
        .setFooter("NOTE : You can react only one time.")
        .setColor("#00FFFF");

      const dev = new Discord.RichEmbed()
        .setTitle("DEVELOPER <:dev:677158021603917845>")
        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
        .setDescription(
          `**You worked as a developer and made an amazing website that sold for <:gbuck:672423515022163978> ${hrandom}**`
        )
        .setFooter("GRIFFIN-BOT")
        .setColor("#D4B41C");

      const youtuber = new Discord.RichEmbed()
        .setTitle("YOUTUBER <:yt:677157415506018304>")
        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
        .setDescription(
          `Your video view was highest and you got <:gbuck:672423515022163978> ${hrandom}`
        )
        .setFooter("GRIFFIN-BOT")
        .setColor("yellow");

      const bm = new Discord.RichEmbed()
        .setTitle("BANK MANAGER <:bm:677158353096671233>")
        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
        .setDescription(
          `Your bank earned ${hrandom}m gbucks today and you got <:gbuck:672423515022163978> ${hrandom}`
        )
        .setFooter("GRIFFIN-BOT")
        .setColor("blue");

      message.channel.send(embed).then(msg => {
        msg
          .react("1️⃣")
          .then(() => msg.react("2️⃣"))
          .then(() => msg.react("3️⃣"));

        const filter = (reaction, user) => {
          return (
            ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name) &&
            user.id === message.author.id
          );
        };

        msg
          .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
          .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === "1️⃣") {
              msg.edit(dev);
              msg.clearReactions();
              db.add(`money_${user.id}`, `${hrandom}`);
            } else if (reaction.emoji.name === "2️⃣") {
              msg.edit(youtuber);
              msg.clearReactions();
              db.add(`money_${user.id}`, `${hrandom}`);
            } else if (reaction.emoji.name === "3️⃣") {
              msg.edit(bm);
              db.add(`money_${user.id}`, `${hrandom}`);
              msg.clearReactions();
            }
          })
          .catch(collected => {
            message.reply("you reacted nothing. oof idiot");
          });
      });
    }
  }
};
