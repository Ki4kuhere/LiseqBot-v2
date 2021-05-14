const discord = require('discord.js');
const random = require('shortid');
const db = require('quick.db')
module.exports.run = (bot, message, args, prefix) => {
        if(message.mentions.users.first()) {
         if(message.member.hasPermission('ADMINISTRATOR')) {
             const memberid = message.mentions.users.first().id;
              const warns = db.get(`warns${memberid}`);
              if(db.get(`warns${memberid}`) == null) db.set(`warns${memberid}`, 0)
              db.set(`warns${memberid}`, db.get(`warns${memberid}`) + 1);
               const e = new discord.MessageEmbed()
               .setTitle('Warn')
               .setDescription(`Pomyślnie dałeś ostrzeżenie osobie o nicku ${message.mentions.users.first().tag} \n Ma ona teraz ${db.get(`warns${memberid}`)} ostrzeżeń!`)
               .setColor('#5eff00')
             message.channel.send(e);
        } else {
                const e = new discord.MessageEmbed()
               .setTitle('Warn')
               .setDescription('Aby kogoś ostrzec musisz mieć uprawnienia!')
               .setColor('#ff2200')
                message.channel.send(e);
             }
         }  else {
            const e = new discord.MessageEmbed()
            .setTitle('Warn')
            .setDescription('Aby kogoś ostrzec musisz go oznaczyć!')
            .setColor('#ff2200')
             message.channel.send(e);
         }
};

module.exports.help = {
    name: "warn"
};