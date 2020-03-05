module.exports = {
  name: "profile",
  aliases: ["level", "pr", "lvl"],
  usage: "profile <optional mention>",
  description: "level command",
  category: "economy",
  run: async (client, message, args) => {
    message.channel
      .send("<a:loading2:672806099120029706> Loading....")
      .then((msg) => {
        msg.delete(1000);
      });
    const db = require("quick.db");
    const Discord = require("discord.js");
    const { Canvas } = require("canvas-constructor");
    const fetch = require("node-fetch");
    //  let path = fetch(
    //  "https://cdn.glitch.com/256ccade-fb85-42e6-882f-cd3dd81f765c%2FSheepingCatsStraight-lrlZ.ttf?v=1579512573401"
    // );
    let ironl =
      "https://cdn.discordapp.com/attachments/650333041025351731/676801003106074635/iron.png";
    let bronzel =
      "https://cdn.discordapp.com/attachments/650333041025351731/676801002862673940/bronze.png";
    let silverl =
      "https://cdn.discordapp.com/attachments/650333041025351731/676801003458134046/silver.png";
    let goldl =
      "https://cdn.discordapp.com/attachments/650333041025351731/676801003735089171/gold.png";
    let platinuml =
      "https://cdn.discordapp.com/attachments/650333041025351731/676801003986878474/platinum.png";
    let user = message.member || message.mentions.members.first();
    let name = user.user.username;
    let level = await db.fetch(`level_${user.id}`);
    if (level === null) level = 0;
    let xp = db.fetch(`xp_${user.id}`);
    if (xp === null) xp = 0;
    let nxp = db.fetch(`nxp_${user.id}`);
    if (nxp === null) nxp = 0;
    if (xp >= nxp) {
      message.channel.send(`<@${user.id}> You leveled up yayyy.`);
      db.subtract(`xp_${user.id}`, nxp);
      db.add(`level_${user.id}`, 1);
      db.add(`nxp_${user.id}`, 100);
    }
    let character = db.fetch(`char_${user.id}`);
    if (character === null) character = ironl;
    let rank = db.fetch(`rank_${user.id}`);
    if (rank === null) rank = "IRON";
    let boyL = await fetch(character);
    let tier = db.fetch(`tier_${user.id}`);
    if (tier === null) tier = "IRON";
    let tiers = `Tier : ${tier}`;
    let money = await db.fetch(`money_${user.id}`);
    if (money === null) money = 0;

    let bank = await db.fetch(`bank_${user.id}`);
    if (bank === null) bank = 0;
    let balance = `Pocket : ${money}\nBank : ${bank}`;
    let av = await message.author.displayAvatarURL;
    let boy = await boyL.buffer();
    let avL = await fetch(av);
    let avatar = await avL.buffer();
    let imgL = await fetch(
      "https://cdn.discordapp.com/attachments/650333041025351731/676668445097721876/1280_720profile.png"
    );
    let image = await imgL.buffer();
    let curLevel = `LEVEL : ${level} || XP : ${xp}/${nxp}`;
    let bar = (xp / nxp) * 40;
    let bal = money;
    let gold = db.fetch(`gold_${user.id}`);
    if (gold === null) gold = 0;
    let levelxp = `${level}  |  ${xp}/${nxp}`;
    let bio = db.fetch(`bio_${user.id}`);
    if (bio === null) bio = "A Griffin-Bot User";
    // Canvas.registerFont(path, "SheepingCats");

    await message.channel.send(
      new Discord.Attachment(
        new Canvas(1280, 720)
          .addBeveledImage(image, 0, 0, 1280, 720, 10)
          .setTextFont("Bold 30px sans-serif")
          .setStroke("#7289DA")
          .setLineWidth(3)
          .addStrokeText(name, 30, 690)
          .setColor("#7289DA")
          .addStrokeText(tier, 400, 630)
          .addStrokeText(bal, 770, 330)
          .addStrokeText(gold, 770, 430)
          .addStrokeText(levelxp, 770, 230)
          .setTextSize("35px")
          .addStrokeText(bio, 620, 600)
          .addImage(boy, 40, 20, 500, 500)
          .toBuffer(),
        `${user.id}_level.png`
      )
    );
  }
};
