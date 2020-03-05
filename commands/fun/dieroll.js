const {RichEmbed} = require('discord.js');
module.exports = {
        name: "roll",
        description: "can roll a dice from d4-d100",
        usage: "<<roll",
        accessableby: "Member",
        aliases: ['r'],
  
    run: async (bot, message, args) => {


        let spliter = args[0].toLowerCase().split("d");
        let multy = spliter[0] || 1;
        let modM = parseInt(args[1]) || 0;

                let diceRoll = 0;
                let diceArry = []
                for (let i = 0; i < multy; i++) {
                    diceRoll = Math.floor(Math.random() * (parseInt(spliter[1]))) + 1;
                    diceArry.push(diceRoll)
                }
                let total100 = 0;
                for (let i = 0; i < diceArry.length; i++) {
                    total100 = parseInt(total100 + diceArry[i])
                }
                 total100 += modM;
                const d100 = new RichEmbed()
                    .setColor(0xEC1028)
                    .addField(':game_die: ' + `${diceArry} +${modM}`, `Total: ${total100}`)
                message.channel.send(d100);
//format => (Prefix) ((optional) number of times you want it to roll)d(dice number)
//!roll 1d20 or !roll 69d9
    }}
