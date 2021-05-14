const discord = require('discord.js');
const db = require('quick.db');
module.exports.run = (bot, message, args, prefix) => {
        if(args[0] && args[0] != 0) {   
            const stawka = parseInt(args[0]);
            if(Number.isNaN(stawka)) {
                const e = new discord.MessageEmbed()
                .setTitle('Ruletka')
                .setDescription('Podaj prawidłową kwote!')
                .setColor('#ff4524')
                .setFooter(`${prefix}ruletka <kwota>`)
                message.channel.send(e);
            } else {
                const won = getRandomInt(1, 2);
                let bal = db.get(`balance_${message.guild.id}_${message.author.id}`);
                if(bal >= stawka && bal != 0) {
                    if(won == 1) {
                        const razem = stawka + bal;
                        db.set(`balance_${message.guild.id}_${message.author.id}`, razem);
                        const e = new discord.MessageEmbed()
                        .setTitle('Ruletka')
                        .setDescription(`Wygrałeś ${stawka}🦊 \n Posiadasz teraz ${bal + stawka}🦊`)
                        .setColor('#42f554')
                        .setFooter(`${prefix}balance`)
                        message.channel.send(e);
                    } else if(won == 2) {
                        db.subtract(`balance_${message.guild.id}_${message.author.id}`, stawka); 
                        const e = new discord.MessageEmbed()
                        .setTitle('Ruletka')
                        .setDescription('Niestety przegrałeś straciłeś to co postawiłeś, spróbuj ponownie!')
                        .setColor('#ff4524')
                        .setFooter(`${prefix}ruletka <kwota>`)
                        message.channel.send(e);
                    }
                } else {
                    const e = new discord.MessageEmbed()
                    .setTitle('Ruletka')
                    .setDescription('Nie posiadasz tylu pieniędzy!')
                    .setColor('#ff4524')
                    .setFooter(`${prefix}ruletka <kwota>`)
                    message.channel.send(e);
                }
            }
        } else {
            const e = new discord.MessageEmbed()
            .setTitle('Ruletka')
            .setDescription('Musisz podać kwotę za którą chcesz grać w ruletkę!')
            .setColor('#ff4524')
            .setFooter(`${prefix}ruletka <kwota>`)
            message.channel.send(e);
        }
};


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

module.exports.help = {
    name: "ruletka"
};