const discord = require('discord.js');

module.exports.run = (bot, message, args, prefix) => {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            if(message.mentions.users.first() || !message.mentions.members.first().bot) {
                if(args[1]) {
                    const reason = args.slice(0).join(" ");
                    const e = new discord.MessageEmbed()
                    .setTitle('Ban')
                    .setDescription(`Pomyślnie zbanowałeś osobę o nicku ${message.mentions.users.first().tag} z powodem ${reason}.`)
                    .setColor('#5eff00')
                  message.channel.send(e);
                  message.mentions.members.first().ban({reason: reason});
                } else {
                    const e = new discord.MessageEmbed()
                    .setTitle('Ban')
                    .setDescription(`Pomyślnie zbanowałeś osobę o nicku ${message.mentions.users.first().tag} bez powodu.`)
                    .setColor('#5eff00')
                    message.channel.send(e)
                    message.mentions.members.first().ban({reason: "Brak powodu"});
                }
            } else {
                const e = new discord.MessageEmbed()
                .setTitle('Ban')
                .setDescription('Aby użyć tej komendy musisz oznaczyć użytkownika!')
                .setColor('#ff2200')
                message.channel.send(e);
            }
        } else {
            const e = new discord.MessageEmbed()
            .setTitle('Ban')
            .setDescription('Aby użyć tej komendy musisz mieć uprawnienia!')
            .setColor('#ff2200')
             message.channel.send(e);
        }
};

module.exports.help = {
    name: "ban",
}