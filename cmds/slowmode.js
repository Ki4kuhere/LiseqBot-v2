const discord = require('discord.js');

module.exports.run = (bot, message, args, prefix) => {
    if(message.member.hasPermission('ADMINISTRATOR')) {
        const czas = parseInt(args[0]);
        if(args[0] && Number.isInteger(parseInt) && !Number.isNaN(czas)) {
             message.channel.setRateLimitPerUser(args[0]);
    let embed2 = new discord.MessageEmbed()
    .setTitle('Slowmode!')
    .setDescription(`Slow mode zostal ustawiony na ${args[0]} sekund`)
    .setColor('#62ff00')
    message.channel.send(embed2);
         } else {
            const embed = new discord.MessageEmbed()
            .setTitle("Nieprawidłowe użycie.")
            .setDescription("Nie wprowadziłeś prawidłowej liczby sekund na którą ma być ustawiony slowmode!")
           .setColor("#ff2200")
           message.channel.send(embed);
         }
    } else {
        const embed = new discord.MessageEmbed()
        .setTitle("Nie posiadasz uprawnień.")
        .setDescription("Nie masz uprawnienia ADMINISTRATOR")
       .setColor("#ff2200")
       message.channel.send(embed);
    }
};

module.exports.help = {
    name: "slowmode",
    aliases: ['sm']
};