const jimp = require('jimp');

module.exports = {
  name: "punch",
  category: "fun",
  run: (client, message) => {
    if (!message.mentions.users.first()) return message.channel.send("Good job you punched the air, maybe try mentioning someone next time.")
    let authorURL = message.author.displayAvatarURL.endsWith(".webp") ? message.author.displayAvatarURL.slice(0, -5) + ".png" : message.author.displayAvatarURL;
    let targetPerson = message.mentions.users.first()
    let targetURL = targetPerson.displayAvatarURL.endsWith(".webp") ? targetPerson.displayAvatarURL.slice(0, -5) + ".png" : targetPerson.displayAvatarURL;
    jimp.read("https://image.freepik.com/free-icon/person-fight-punch_318-29637.jpg", (err, image) => {
        if (err) return console.log(err);
        jimp.read(authorURL, (err, author) => {
            if (err) return console.log(err);
            author.resize(100, 100);
            jimp.read(targetURL, (err, target) => {
                if (err) return console.log(err);
                target.resize(100, 100);
                target.rotate(-4)
                image.composite(author, 110, 30);
                image.composite(target, 400, 40);
                image.getBuffer(jimp.AUTO, (err, buff) => {
                    if (err) return console.log(err);
                    message.channel.send(`**${message.author.username}** *sucker punches* **${message.mentions.users.first().username}**`);
                    message.channel.sendFile(buff);
                })
            })
        })
    })
}
}