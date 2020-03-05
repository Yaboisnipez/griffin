const { RichEmbed } = require("discord.js");

module.exports = {
    name: "say",
    category: "fun",
    aliases: ["s"],
    description: "Says your input via the bot",
    usage: "say <input>",
    run: (client, message, args) => {
           if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete(5000));

        message.delete()

        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor("#00FFFF");

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
            message.delete()
        }
    }
}