const Discord = require("discord.js");
const { get } = require("request-promise-native");
var fs = require("fs"); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
module.exports = {
  name: "kiss",
  category: "fun",
  description: "hmmm you want to kiss someone",

  run: async (client, message, args) => {
    const options = {
      url: "https://nekos.life//api/kiss",
      json: true
    };

    get(options).then(body => {
      const hugEmb = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setImage(body.url);
      const sadEmb = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setImage("https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif");
      if (!args[0]) {
        message.channel.send(
          `<@${message.author.id}> hug <@${message.author.id}> Oh wait! You can't kiss yourself!`,
          {
            embed: sadEmb
          }
        );
        return;
      }

      if (message.mentions.users.first().id == 653812416496402463) {
        message.channel.send(
          `<@${message.author.id}> kissing me.. Oh, thanks, b-but i\'m only a bot...`,
          {
            embed: hugEmb
          }
        );
        return;
      }

      if (!message.mentions.users.first())
        return message.channel
          .send({
            embed: {
              description: "Please mention someone!",
              color: 0xff2222
            }
          })
          .then(msg => {
            if (conf[message.guild.id].delete == "true") {
              msg.delete(conf[message.guild.id].deleteTime);
            }
          });
      message.channel.send(`<@${message.author.id}> aww you kissed ${args[0]}`, {
        embed: hugEmb
      });
    });
  }
};
