const discord = require('discord.js');
const db = require('quick.db');
module.exports.run = (bot, message, args, prefix) => {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            if(message.mentions.users.first()) {
                let warns = db.get(`warns${message.mentions.users.first().id}`);
                if(warns == 0 || warns == null) {
                    const e = new discord.MessageEmbed()
                    .setTitle('UnWarn')
                    .setDescription('Ta osoba nie ma żadnych ostrzeżeń!')
                    .setColor('#ff2200')
                     message.channel.send(e);
                } else {
                    db.set(`warns${message.mentions.users.first().id}`, warns - 1);
                    warns = db.get(`warns${message.mentions.users.first().id}`);
                    const e = new discord.MessageEmbed()
                    .setTitle('UnWarn')
                    .setDescription(`Pomyślnie usunąłeś ostrzeżenie osobie o nicku ${message.mentions.users.first().tag} \n Ma ona teraz ${db.get(`warns${message.mentions.users.first().id}`)} ostrzeżeń!`)
                    .setColor('#5eff00')
                    message.channel.send(e);
                }
            } else {
                const e = new discord.MessageEmbed()
                .setTitle('UnWarn')
                .setDescription('Aby użyć tej komendy musisz kogoś oznaczyć!')
                .setColor('#ff2200')
                 message.channel.send(e);
            }
        } else {
            const e = new discord.MessageEmbed()
            .setTitle('UnWarn')
            .setDescription('Aby użyć tej komendy musisz mieć uprawnienia!')
            .setColor('#ff2200')
            .setFooter(`${prefix}unwarn @osoba`)
             message.channel.send(e);
        }
};

module.exports.help = {
    name: "unwarn"
};