const discord = require('discord.js')
const db = require('quick.db');

module.exports.run = (bot, message, args, prefix) => {
        const balance = db.all().filter(e => e.ID.startsWith('balance')); 
        let content = '';
        for(i = 0; i < balance.length; i++) {
          if(i == 10) break;
          const u = bot.users.cache.get(balance[i].ID.split('_')[2]) || "invalid-user";
          if(i != 0) {
            content += `${i + 1}.${u.username} • ${db.get(`balance_${message.guild.id}_${u.id}`)}🦊 \n`
          } else {
            if(u == undefined  || u == null) u = 'Nieprawidłowy użytkownik'
            content += `<a:crownemoji3:842545490028396556> 1.${u.username} • ${db.get(`balance_${message.guild.id}_${u.id}`)}🦊 \n`

           }
        }
        const e = new discord.MessageEmbed()
        .setDescription(content || "Brak danych!")
        .setColor('#03fc39')
        message.channel.send(e);
};  


module.exports.help = {
    name: 'top',
    aliases: ['leaderboard', 'lb']
};