module.exports = {
  name: "google",
  aliases: ["g"],
  description: "test",
  usage: "",
  run: async (client, message, args) => {
/*    const Google = require("relevant-google");
    const Discord = require("discord.js");
    // We then need a Google API key...
    const googleapi = ("-8a8vTzKI")
    // you would define your one as const googleapi = (`YOUR API KEY`)

    //Command handler stuff

    exports.run = async (client, message, args) => {
      //Libarys we need that are built in node
      const fetch = require("node-fetch");
      const querystring = require("querystring");
      // if the user does not supply a search term send a message

      // we need to iniate a google api!
      const google = new Google(googleapi);

      if (!args.length)
        return message.channel.send("Supply a search term please!");

      //Args to string
      const query = querystring.stringify({ term: args });
      //awaiting a response from google and creating an embed to see more stuff to use type console.log(res)
      const { list } = await fetch(
        google.search(query).then(res => {
          const embed = new Discord.RichEmbed()
            .setColor(`#c705bd`)
            .setTitle(`${res.title}`)
            .setURL(`${res.formattedUl}`)
            .addField(`Google Result`(res.snippet))
            .addField(`Link`(`${res.formattedUrl}`));
          message.channel.send(res.title);
        })
      );

      // if no search results found send this message!

      if (!list.length) {
        message.channel.send(`No results found for ${args}}`);
      }
    };*/
    var googleapis = require('googleapis');
googleapis.discover('customsearch', 'v1').execute(function(err, client) {
  // set api key
  client.withApiKey('AIzaSyD1ev0arFP9fks7V4fUmywdNA-8a8vTzKI');
  client.search.cse.list({ q: 'loco' }).execute(console.log);
});
  }
};
