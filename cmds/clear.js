
const discord = require('discord.js');
module.exports.run = async(bot, message, args, prefix) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            const embed = new discord.MessageEmbed()
            .setTitle('Brak uprawnien')
            .setDescription("Nie masz uprawnienia `MANAGE_MESSAGES`")
            .setColor('#fc1803')
            message.channel.send(embed)
            return;
        }
        if(args[0]) {
            if(args[0] >= 1 && args[0] <= 100) {
            message.channel.bulkDelete(Number.parseInt(args[0]));
            const embed = new discord.MessageEmbed()
            .setTitle('Clear')
            .setDescription('Usunieto `' + args[0] + "` wiadomości!")
            .setColor('#5eff00')
            const e1 = await message.channel.send(embed);
            setTimeout(() => {
                e1.delete();
            }, 3000);
        } else {
            const embed = new discord.MessageEmbed()
            .setTitle('Nieprawidlowe uzycie')
            .setDescription('Podales nieprawidlową liczbę wiadomosci! \n Prawidlowe uzycie: `l!clear <messages>`')
            .setColor('#fc1803')
            message.channel.send(embed);
        }
        } else {
            const embed = new discord.MessageEmbed()
            .setTitle('Nieprawidlowe uzycie')
            .setDescription('Podales nieprawidlową liczbę wiadomosci! \n Prawidlowe uzycie: `l!clear <messages>`')
            .setColor('#fc1803')
            message.channel.send(embed);
        }
};

module.exports.help = {
    name: "clear",
    aliases: ["chatclear", "cc", "c"]
};
