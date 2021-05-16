const discord = require('discord.js');
const db = require('quick.db')
module.exports.run = async(bot, message, args, prefix) => {
        const id = message.channel.id;
        if(args[0]) {
            const ankieta = args.join(" ");
            const embed = new discord.MessageEmbed()
            .setTitle('Ankieta')
            .setDescription(ankieta + '\n\n Zareaguj aby uczestniczyć w ankiecie.')
            .setColor('#20fc03')
            const msg = await message.channel.send(embed);
            db.set(`ankieta${id}`, msg.id); 
            msg.react('775412540439920640');
            msg.react('775407239790854214');
        } else {
            const embed = new discord.MessageEmbed()
            .setTitle('Ankiety')
            .setDescription('Nie wprowadziłeś treści ankiety!')
            .setColor('#fc2003')
            message.channel.send(embed);
        }
};

module.exports.help = {
    name: "ankieta",
    aliases: ['poll']
};