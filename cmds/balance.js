const discord = require('discord.js');
const db = require('quick.db')

module.exports.run = (bot, message, args, prefix) => {
        if(!message.mentions.users.size) {
            let bal = db.get(`balance_${message.guild.id}_${message.author.id}`);
            if(bal == null) bal = 0; 
            const e = new discord.MessageEmbed()
            .setTitle('Twój balans')
            .setDescription(`Twój balans wynosi **${bal}**🦊`)
            .setColor('#45f542')
            .setFooter(`Użyj ${prefix}work by pracować`)
            message.channel.send(e);
        } else {
            const u = message.mentions.users.first();
            let bal = db.get(`balance_${message.guild.id}_${u.id}`);
            if(bal == null) bal = 0; 
            const e = new discord.MessageEmbed()
            .setTitle('Balans')
            .setDescription(`Balans osoby o nicku ${u.username} wynosi **${bal}**🦊`)
            .setColor('#45f542')
            .setFooter(`Użyj ${prefix}work by pracować.`)
            message.channel.send(e);
        }
};

module.exports.help = {
    name: "balance",
    aliases: ['bal', 'kasa', 'money', 'eco']
};