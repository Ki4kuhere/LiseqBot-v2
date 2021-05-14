const discord = require('discord.js');
const config = require('../config');
const db = require('quick.db')
module.exports.run = (bot, message, args, prefix) => {
        if(message.author.id == config.ownerid) {
            try {
                const code = args.join(" ");
                let evaled = eval(code);
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
           
                message.channel.send(clean(evaled), {code:"xl"});
              } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
              }
        } else {
            message.channel.send("Ta komenda jest tylko dla developera!")
        }
};

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }


  module.exports.help = {
    name: "eval",
    aliases: ['el']
  };