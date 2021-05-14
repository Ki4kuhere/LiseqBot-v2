
const discord = require('discord.js');

module.exports.run = (bot, message, args, prefix) => {
        let i = getRandomInt(1, 4)
        const pytanie = message.content.replace(bot.ustawienia.get(message.guild.id).prefix, "")
        const pytanie1 = pytanie.replace("8ball", "")
        const e = new discord.MessageEmbed()
        .setTitle(`8ball | ${pytanie1}`)
        if(i == 1) {
        e.setDescription(`Tak.`)
        } else if(i == 2) {
            e.setDescription(`Nie.`)
        } else if(i == 3) {
            e.setDescription(`Chyba tak.`)
        } else if(i == 4) {
            e.setDescription(`Chyba nie.`)
        }
        e.setColor('#5eff00')
        message.channel.send(e);
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }


  module.exports.help = {
      name: "8ball",
      aliases: ["eightball", "8b"]
  }