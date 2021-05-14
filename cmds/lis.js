const discord = require('discord.js');

module.exports.run = (bot, message, args, prefix) => {
        const num = getRandomInt(1, 100);
        const url = `https://randomfox.ca/images/${num}.jpg`;
        let embed2 = new discord.MessageEmbed()
        .setTitle('Lis!')
        .setColor('#5eff00')
        .setImage(url)
        message.channel.send(embed2);
};


module.exports.help = {
name: 'lis',
aliases: ['lisio']
};

function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min; 
}