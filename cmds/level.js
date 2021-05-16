const discord = require('discord.js');
const db = require('quick.db');
module.exports.run = (bot, message, args, prefix) => {
    if(message.mentions.users.first()) {
        if(db.get(`levels${message.guild.id}`) == null || db.get(`levels${message.guild.id}`) == "false") {
            const e = new discord.MessageEmbed()
            .setTitle('Poziomy')
            .setDescription(`Ta funkcja jest wyłączona! \n Aby ją włączyć wpisz **${prefix}config levels true**`)
            .setColor('#ff241c')
            message.channel.send(e);
            return;
        }
        let level = db.get(`level_${message.guild.id}_${message.mentions.users.first().id}`);
        if(level == null) level = 1;
        const maxxp = level * 6;
        const currentxp = db.get(`xp_${message.guild.id}_${message.mentions.users.first().id}`)
        const e = new discord.MessageEmbed()
        .setTitle(`Poziom osoby o nicku ${message.mentions.users.first().username}`)
        .setDescription(`Poziom tej osoby wynosi **${level}** \n XP: **${currentxp}**/**${maxxp}**`)
        .setFooter('Aby zdobywać poziomy wysyłaj wiadomości!')
        .setColor('#03fc07')
        message.channel.send(e);
    } else {
        if(db.get(`levels${message.guild.id}`) == null || db.get(`levels${message.guild.id}`) == "false") return;
        let level = db.get(`level_${message.guild.id}_${message.author.id}`);
        if(level == null) level = 1;
        const maxxp = level * 6;
        const currentxp = db.get(`xp_${message.guild.id}_${message.author.id}`)
        const e = new discord.MessageEmbed()
        .setTitle(`Twój poziom`)
        .setDescription(`Twój poziom wynosi **${level}** \n XP: **${currentxp}**/**${maxxp}**`)
        .setFooter('Aby zdobywać poziomy wysyłaj wiadomości!')
        .setColor('#03fc07')
        message.channel.send(e);
    }
};


module.exports.help = {
    name: "level",
    aliases: ['rank']
};