const discord = require('discord.js');
const db = require('quick.db');
const talked = talkedRecently;
module.exports.run = (bot, message, args, prefix) => {

        let bal = db.get(`balance_${message.guild.id}_${message.author.id}`);
        if(bal == null) bal = 0;
        let zarobek = getRandomInt(2, 100);
        const wynik = bal + zarobek;
        db.set(`balance_${message.guild.id}_${message.author.id}`, wynik);
        const odp = getRandomInt(1, 6);
        const e = new discord.MessageEmbed()
        .setTitle('Praca')
        .setColor('#45f542')
        .setFooter(`Wpisz ${prefix}balance aby sprawdzić twój balans`)
        if(odp == 1) {
            e.setDescription(`Pracowałeś jako wędkarz i zarobiłeś ${zarobek}🦊 \n Posiadasz teraz ${wynik}🦊`)
        } else if(odp == 2) {
            e.setDescription(`Pracowałeś jako programista i zarobiłeś ${zarobek}🦊 \n Posiadasz teraz ${wynik}🦊`)  
        } else if(odp == 3) {
            e.setDescription(`Pracowałeś jako listonosz i zarobiłeś ${zarobek}🦊 \n Posiadasz teraz ${wynik}🦊`)     
        } else if(odp == 4) {
            e.setDescription(`Pracowałeś jako murarz i zarobiłeś ${zarobek}🦊 \n Posiadasz teraz ${wynik}🦊`)
        } else if(odp == 5) {
            e.setDescription(`Pracowałeś jako ganiacz kurczaków i zarobiłeś ${zarobek}🦊 \n Posiadasz teraz ${wynik}🦊`)
        } else if(odp == 6) {
            e.setDescription(`Pracowałeś jako komornik i zarobiłeś ${zarobek}🦊 \n Posiadasz teraz ${wynik}`)
        }
        message.channel.send(e);
        talked.add(message.author.id);
        setTimeout(() => {
            talked.delete(message.author.id)
        }, 15000);
}; 


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

module.exports.help = {
    name: "work",
    aliases: ['pracuj']
}
