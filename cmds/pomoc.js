const discord = require('discord.js');

module.exports.run = (bot, message, args , prefix) => {
    const e = new discord.MessageEmbed()
    .setTitle('Pomoc')
    .setDescription(`${prefix}8ball \n ${prefix}ankieta \n ${prefix}avatar \n ${prefix}balance \n ${prefix}ban \n ${prefix}clear \n ${prefix}config \n ${prefix}crime \n ${prefix}cytat \n ${prefix}eval \n ${prefix}globalban \n ${prefix}hacker \n ${prefix}invite \n ${prefix}kick \n ${prefix}level \n ${prefix}lis \n ${prefix}obraz \n ${prefix}pomoc \n ${prefix}ruletka \n ${prefix}slowmode \n ${prefix}top \n ${prefix}unwarn \n ${prefix}warn \n work`)
    message.channel.send(e);
};


module.exports.help = {
name: "pomoc",
aliases: ['help']
};