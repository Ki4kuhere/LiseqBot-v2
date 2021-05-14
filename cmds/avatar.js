const discord = require('discord.js');

module.exports.run = (bot, message, args, prefix) => {
        if(!message.mentions.users.size) {
            let embed = new discord.MessageEmbed()
            .setTitle('Twój avatar')
            .setColor('#5eff00')
            .setImage(message.author.displayAvatarURL())
            message.channel.send(embed);
    
        } else {
            var u = message.mentions.users.first(); 
            let embed = new discord.MessageEmbed()
            .setTitle('Avatar osoby o nazwie ' + u.username)
            .setColor('#5eff00')
            .setImage(u.displayAvatarURL())
            message.channel.send(embed);
        }
};  

module.exports.help = {
    name: "avatar",
    aliases: ['icon', 'pfp']
};

