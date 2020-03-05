const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "buy",
  category: "economy",
  description: "buy some items from shop",

  run: async (bot, message, args) => {
    let user = message.member;
    let author = db.get(`money_${user.id}`);
    let bag = db.get(`backpack_${user.id}`);
    if (args[0].startsWith("p")) {
      if (author < 25000)
        return message.channel.send(
          `You must have \`25000\` gbucks to buy a **PHONE** `
        );

      db.set(`phone_${user.id}`, 1);

      db.subtract(`money_${user.id}`, 25000);
      message.channel.send(
        `You successfully bought a **PHONE** for \`25000\` gbucks `
      );
    } else if (args[0].startsWith("b")) {
      if (bag === 1)
        return message.channel.send(
          "You already have a Backpack so you cant buy one more."
        );
      if (author < 10000)
        return message.channel.send(
          `You must have \`10000\` gbucks to buy a **BACKPACK** `
        );

      db.set(`backpack_${user.id}`, 1);

      db.subtract(`money_${user.id}`, 10000);
      message.channel.send(
        `You successfully bought a **BACKPACK** for \`10000\` gbucks `
      );
    } else if (args[0].startsWith("c")) {
      if (author < 500)
        return message.channel.send(
          `You must have \`500\` gbucks to buy a **CHIPs**`
        );
      db.set(`chips_${user.id}`, 1);

      db.subtract(`money_${user.id}`, 500);

      message.channel.send(
        `You successfully bought a **CHIPS** \`500\` gbucks`
      );
    }
  }
};
