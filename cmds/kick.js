const discord = require('discord.js');

module.exports.run = (bot, message, args, prefix) => {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            if(message.mentions.users.first()) {
                if(args[0]) {
                    const reason = args.slice(0).join(" ");
                    const e = new discord.MessageEmbed()
                    .setTitle('Kick')
                    .setDescription(`Pomyślnie wyrzuciłeś osobę o nicku ${message.mentions.users.first().tag} z powodem ${reason}.`)
                    .setColor('#5eff00')
                  message.channel.send(e);
                  message.mentions.members.first().kick(reason);
                } else {
                    const e = new discord.MessageEmbed()
                    .setTitle('Kick')
                    .setDescription(`Pomyślnie wyrzuciłeś osobę o nicku ${message.mentions.users.first().tag} bez powodu.`)
                    .setColor('#5eff00')
                    message.channel.send(e)
                    message.mentions.members.first().kick("Brak powodu")
                }
            } else {
                const e = new discord.MessageEmbed()
                .setTitle('Kick')
                .setDescription('Aby użyć tej komendy musisz kogoś oznaczyć!')
                .setColor('#ff2200')
                message.channel.send(e);
            }
        } else {
            const e = new discord.MessageEmbed()
            .setTitle('Kick')
            .setDescription('Aby użyć tej komendy musisz mieć uprawnienia!')
            .setColor('#ff2200')
             message.channel.send(e);
        }
};

module.exports.help = {
    name: "kick"
};