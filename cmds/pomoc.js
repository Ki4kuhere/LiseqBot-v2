const discord = require('discord.js');

module.exports.run = (bot, message, args , prefix) => {
    const e = new discord.MessageEmbed()
    .setTitle('Pomoc')
    .setDescription('8ball \n ankieta \n avatar \n balance \n ban \n clear \n config \n crime \n cytat \n eval \n globalban \n hacker \n invite \n kick \n level \n lis \n obraz \n pomoc \n ruletka \n slowmode \n top \n unwarn \n warn \n work')
    message.channel.send(e);
};


module.exports.help = {
name: "pomoc",
};