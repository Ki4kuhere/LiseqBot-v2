const discord = require('discord.js');

module.exports.run = (bot , message, args, prefix) => {
    message.channel.send("https://discord.com/api/oauth2/authorize?client_id=834849629254058036&permissions=0&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard%2Fcallback&scope=bot");
};
module.exports.help = {
    name: "invite",
    aliases: ["zaproszenie"]
};