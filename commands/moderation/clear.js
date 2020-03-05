var fs = require("fs"); //FileSystem

module.exports = {
  name: "clear",
  usage: "[number of messages]",
  category: "moderation",
  description: "deleted specified number of messages",

  run: async (client, message, args, con, guilds) => {
    
    if (!args[0]) 
      return message.channel.send('Please provide an amount of messages to be removed.')
    
    
    if (isNaN(args[0]) || parseInt(args[0]) <= 0)
      return message.channel.send('Cannot resolve ``clear`` argument.')
  
    
    if (!message.member.hasPermission('MANAGE_MESSAGES'))
      return message.channel.send(`You are lacking the permission node: \`MANAGE_MESSAGES\`\ `)
      .then(message => message.delete(6000));
    
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES'))
      return message.channel.send(`I am lacking the permission \`MANAGE_MESSAGES\`\ `)

    
    let deleteAmount;
    
    if (parseInt(args[0]) > 100) {
      deleteAmount = 100;
    } else {
      deleteAmount = parseInt(args[0]) + 1;
    }
    
    setTimeout(() => {
      message.channel.bulkDelete(deleteAmount, true)
      .then(value => {
        message.channel.send(`Deleted **__${deleteAmount}__** messages.`)
          .then(msg => msg.delete(6000))
      })
      .catch(err => {
        message.channel.send(`An error occured while deleting messages. \n\`${err}\`\ `)
          .then(msg => msg.delete(6000))
      })
    }, 1200);
  }
};
