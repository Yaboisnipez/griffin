const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "welcome",
  description: "see welcome info of your server",
  usage: "welcome",
  aliases: ["w"],
  run: async (client, message, args) => {
    let guild = message.guild;

    let gchannel = db.get(`gChannel_${guild.id}`);
    let welcome = db.get(`welcome_${guild.id}`);
    let msg = db.get(`welcome_msg_${guild.id}`);
    if (msg === null)
      db.set(
        `welcome_msg_${guild.id}`,
        `Welcome, {member} to {server} we hope you enjoy`
      );
    if (welcome === null) welcome = "disabled";
    if (gchannel === null) gchannel = "no channel";
    let memberName = message.member.user.username;
    let atmember = message.member.id;
    let serverName = guild.name;

    let r = `${msg}`
    let r1 = r.toString().replace(/{member}/g, memberName);
    let rr = r1;
    let r2 = rr.toString().replace(/{server}/g, serverName);
    let rrr = r2;
    let r3 = rrr.toString().replace(/{@member}/g, `\<@${atmember}\>`);
    let rrrr = r3;
    let finalmsg = rrrr.toString().replace(/,/g, " ");

    if (!args[0]) {
      let embed = new Discord.RichEmbed()
        .setTitle(`Welcome info for ${guild.name}`)
        .setDescription(
          `**WELCOME CHANNEL**\n\`${
            client.channels.get(gchannel).name
          }\`\n\n**ENABLED/DISABLED**\n\`${welcome}\`\n\n**WELCOME MESSAGE**\n${finalmsg}`
        )
        .setThumbnail(guild.iconURL);
      message.channel.send(embed);
    } else if (args[0] === "enable") {
      db.set(`welcome_${guild.id}`, `enabled`);
      message.channel.send("done");
    } else if (args[0] === "disable") {
      db.set(`welcome_${guild.id}`, `disabled`);
      message.channel.send("Done");
    }
  }
};
