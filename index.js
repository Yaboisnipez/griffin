const http = require("http");
const { Client, Collection, Util } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const Discord = require("discord.js");
const { promptMessage } = require("./function.js");
const { TOKEN, DBLAPITOKEN, STATUS } = require("./config.js");
const bot = new Discord.Client();
const Canvas = require("canvas");
const db = require("quick.db");
const express = require("express");
const app = express();

//SITE MANAGEMENT
const CLIENT_ID = "";
const CLIENT_SECRET = "";

const serverSize = bot.guilds.size;
const ping = bot.ping;

app.set("view engine", "ejs");
app.get("/mio", (request, response) => {
  console.log("Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 60000);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/statistics", (req, res) => {
  res.render("stats", { ping: db.get(`ping`), servers: db.get(`guilds`) });
});

var server = app.listen(4000, function() {
  console.log("listening to port 4000");
});

const queue = new Map();

const sendRandomMeme = require("./commands/fun/meme.js");

bot.on("ready", () => {
  setInterval(sendRandomMeme, 1000 * 5, bot);
});

const client = new Client({
  disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
  path: __dirname + "/.env"
});

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
  console.log(`Hi, ${client.user.username} is now online!`);

  setInterval(() => {
    client.user.setActivity(`${STATUS}`, { type: "Watching" });
  }, 5000);

  const DBL = require("dblapi.js");
  const dbl = new DBL(
    DBLAPITOKEN,
    {
      webhookPort: 5000, 
      statsInterval: 1800000,
    },
    bot
  );
  dbl.webhook.on("ready", hook => {
    console.log(`Webhook running with path ${hook.path}`);
  });
  client.on("ready", () => {
    setInterval(() => {
      dbl.postStats(client.guilds.size).then(() => {
        console.log("server count posted");
      });
    }, 1800000);
    setInterval(() => {
      db.set(`guilds`, client.guilds.size);
      db.set(`ping`, client.ping);
    }, 100);
  });

  dbl.webhook.on("vote", vote => {
    console.log(`User with ID ${vote.user} just voted!`);
  });
  dbl.on("posted", () => {
    console.log("Server count posted!");
  });

  dbl.on("error", e => {
    console.log(`Oops! ${e}`);
  });
});

client.on("message", async (message, guild) => {
  const pJson = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));
  if (!pJson[message.guild.id]) pJson[message.guild.id] = { prefix: "g!" };
  let data = {
    prefix: pJson[message.guild.id].prefix
  };
  const PREFIX = data.prefix;

  if (message.content === "<@650312432262184960>")
    return message.channel.send(
      `Hello <a:hello:673498787859136536> my prefix is ${PREFIX}`
    );
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(PREFIX)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(PREFIX.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args, data);
});
client.on("guildMemberAdd", async member => {
  let guild = member.guild;
  let gchannel = db.fetch(`gChannel_${guild.id}`);
  let welcome = db.get(`welcome_${guild.id}`);
  if (welcome === null) welcome = "disabled";
  let msg = db.get(`welcome_msg_${guild.id}`);
  if (msg === null)
    db.set(
      `welcome_msg_${guild.id}`,
      `Welcome, {member} to {server} we hope you enjoy`
    );

  let memberName = member.user.username;
  let serverName = guild.name;
  let atmember = member.id;

  let r = `${msg}`;
  let r1 = r.toString().replace(/{member}/g, memberName);
  let rr = r1;
  let r2 = rr.toString().replace(/{server}/g, serverName);
  let rrr = r2;
  let r3 = rrr.toString().replace(/{@member}/g, `\<@${atmember}\>`);
  let rrrr = r3;
  let finalmsg = rrrr.toString().replace(/,/g, " ");

  if (!gchannel) return;
  if (welcome === "disabled") return;
  client.channels.get(gchannel).send(`${finalmsg}`);
});

client.on("message", async message => {
  const pJson = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));
  if (!pJson[message.guild.id]) pJson[message.guild.id] = { prefix: "g!" };
  let data = {
    prefix: pJson[message.guild.id].prefix
  };
  const PREFIX = data.prefix;

  if (message.content.startsWith(PREFIX)) {
    let user = message.author;
    const { Canvas } = require("canvas-constructor");
    const fetch = require("node-fetch");
    let name = message.member.user.username;
    let level = await db.get(`level_${user.id}`);
    if (level === null) level = 0;
    let xp = db.get(`xp_${user.id}`);
    if (xp === null) xp = 0;
    let nxp = db.get(`nxp_${user.id}`);
    if (nxp === null) nxp = 0;
    let tier = db.get(`tier_${user.id}`);
    if (tier === null) tier = "IRON";
    let phone = db.get(`phone_${user.id}`);
    if (phone === null) phone = 0;

    // let rank = db.get(`rank_${user.id}`);
    // if (rank === null) rank = "Iron";

    db.add(`xp_${user.id}`, 1);
    if (xp >= 100)
      if (phone === 1) {
        message.channel.send(`<@${user.id}> You leveled up yay.`);
      }
    db.subtract(`xp_${user.id}`, 100);
    db.add(`level_${user.id}`, 1);
    db.set(`nxp_${user.id}`, 100);

    if (level >= 10 && tier === "IRON") {
      //  message.channel.send("+ now your tier is **BRONZE**");
      db.set(`tier_${user.id}`, "BRONZE");
    }
    if (level >= 25 && tier === "BRONZE") {
      //   message.channel.send("+ now your tier is **SILVER**");
      db.set(`tier_${user.id}`, "SILVER");
    }
    if (level >= 35 && tier === "SILVER") {
      //    message.channel.send("+ now your tier is **GOLD**");
      db.set(`tier_${user.id}`, "GOLD");
    }
    if (level >= 50 && tier === "GOLD") {
      // message.channel.send("+ now your tier is **PLATINUM**");
      db.set(`tier_${user.id}`, "PLATINUM");
    }
  }
});
//client.login(TOKEN);
