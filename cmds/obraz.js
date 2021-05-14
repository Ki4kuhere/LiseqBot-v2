const discord = require('discord.js');
module.exports.run = (bot, message, args, prefix) => {
        const num = getRandomInt(1000, 2000);
        const url = `https://picsum.photos/1000/${num}`
        let embed2 = new discord.MessageEmbed()
        .setTitle('Obrazek')
        .setColor('#5eff00')
        .setImage(url)
        message.channel.send(embed2);  
};


module.exports.help = {
    name: "obraz"
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}