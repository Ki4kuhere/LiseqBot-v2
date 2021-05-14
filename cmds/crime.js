const discord = require('discord.js');
const db = require('quick.db');
const talked = talkedRecently;
module.exports.run = (bot, message, args, prefix) => {
        let bal = db.get(`balance_${message.guild.id}_${message.author.id}`);
        if(bal == null) bal = 0;
        let zarobek = getRandomInt(100, 200);
        const wynik = bal + zarobek;
        const odp = getRandomInt(1, 6);
        const win = getRandomInt(1, 2);
        if(win == 1) {
        const e = new discord.MessageEmbed()
        .setTitle('Kradzież')
        .setColor('#45f542')
        .setFooter('Wpisz l!balance aby sprawdzić swój balans!')
        if(odp == 1) {
            e.setDescription(`Obrabowałeś bank i zarobiłeś ${zarobek}🦊 \n Posiadasz teraz ${wynik}🦊`)
        } else if(odp == 2) {
            e.setDescription(`Obrabowałeś sklep i zarobiłeś ${zarobek}🦊 \n Posiadasz teraz ${wynik}🦊`)  
        } else if(odp == 3) {
            e.setDescription(`Ukradłeś sejf bogatej firmie zarobiłeś ${zarobek}🦊 \n Posiadasz teraz ${wynik}🦊`)     
        } else if(odp == 4) {
            e.setDescription(`Obrabowałeś jubilera i zarobiłeś ${zarobek}🦊 \n Posiadasz teraz ${wynik}🦊`)
        } else if(odp == 5) {
            e.setDescription(`Ukradłeś ciężarówkę z kurczakami i zarobiłeś ${zarobek}🦊 \n Posiadasz teraz ${wynik}🦊`)
        } else if(odp == 6) {
            e.setDescription(`Ukradłeś samochód i sprzedałeś go za ${zarobek}🦊 \n Posiadasz teraz ${wynik}🦊`)
        }
        message.channel.send(e);
        db.set(`balance_${message.guild.id}_${message.author.id}`, wynik);
    } else {
        const strata = getRandomInt(25, 50);
        let w = db.get(`balance_${message.guild.id}_${message.author.id}`) - strata;
        if(w < 0) w = 0; 
        const e = new discord.MessageEmbed()
        .setTitle('Kradzież')
        .setColor('#ff4524')
        .setDescription(`Niestety zostałeś złapany i musisz zapłacić ${strata}🦊 grzywny.`)
        db.set(`balance_${message.guild.id}_${message.author.id}`, w);
        message.channel.send(e);
    }
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
    name: "crime",
    aliases: ['kradnij']
}
