const discord = require('discord.js');

module.exports.run = async(bot, message, args, prefix) => {
        const e = new discord.MessageEmbed()
        .setTitle('Hackowanie')
        .setDescription('Trwa hackowanie serwera...')
        .setColor('#5eff00')
        const msg = await message.channel.send(e);
        setTimeout(async function() {
            const e1 = new discord.MessageEmbed()
            .setTitle('Hackowanie..')
            .setDescription(`Trwa banowanie ${message.guild.memberCount} osób`)
            .setColor('#5eff00')
            const msg1 = await msg.edit(e1);
            setTimeout(async function() {
                const e2 = new discord.MessageEmbed()
                .setTitle('Error')
                .setDescription('Oj nie, nie usuwam serwerów!')
                .setColor('#ff2200')
                msg1.edit(e2);
            }, 2000);
        }, 1000);
};

module.exports.help = {
    name: "hacker",
    aliases: ['hack']
};