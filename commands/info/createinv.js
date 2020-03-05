module.exports = {
  name: "createinv",
  category: "info",
  usage: "[]",
  description: "pl",
  run: (client, message, args) => {
    message.channel
      .createInvite()
      .then(invite =>
        message.channel.send(
          `Created an invite with a code of ${invite.code}\nFull link : https://discord.gg/${invite.code}`
        )
      )
      .catch(console.error);
  }
};
