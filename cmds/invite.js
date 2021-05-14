const discord = require('discord.js');

module.exports.run = (bot , message, args, prefix) => {
    message.channel.send("https://discord.com/api/oauth2/authorize?client_id=834849629254058036&permissions=0&redirect_uri=https%3A%2F%2Fliseqbot.pl&scope=bot");
};
module.exports.help = {
    name: "invite",
    aliases: ["zaproszenie"]
};