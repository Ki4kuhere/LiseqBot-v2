const Discord = require("discord.js");
const moment = require('moment');
require('moment-duration-format')
module.exports.run = (bot, message, args) => {
        const duration = moment.duration(bot.uptime).format("D [Dni], H [Godzin], m [Minut], s [Sekund]");
        let embed = new Discord.MessageEmbed()
        .setTitle('Informacje o bocie')
        .setColor('#5eff00')
        .setDescription('Data utworzenia bota: 08.11.2020, Czas GMT+1 20:00 \n Link do dodania bota: [Kliknij we mnie!](https://discord.com/api/oauth2/authorize?client_id=834849629254058036&permissions=0&redirect_uri=https%3A%2F%2Fliseqbot.pl&scope=bot) \n Bot jest online: ' + duration)
       message.channel.send(embed);  
};
module.exports.help = {
    name: 'bot',
};