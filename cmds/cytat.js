const discord = require('discord.js')

module.exports.run = (bot, message, args, prefix) => {
        const e = new discord.MessageEmbed()
        .setTitle('Cytat')
        .setDescription(cytat())
        .setColor('#5eff00')
        message.channel.send(e);
};

module.exports.help = {
    name: "cytat"
}

function cytat() {
    min = Math.ceil(1);
    max = Math.floor(6);
    const wynik = Math.floor(Math.random() * (max - min + 1)) + min;
        if(wynik == 1) {
            let string = "Jestem lisio, oto ja!";
            return string;
        } else if(wynik == 2) {
            let string = "Lubie placki!"
            return string;
        } else if(wynik == 3) {
            let string = "Bez lisa nie ma innych lisów!"
            return string;
        } else if(wynik == 4) {
            let string = "Kot to przyjaciel każdego lisa."
            return string;
        } else if(wynik == 4) {
            let string = "Czekoladowee!"
            return string;
        } else if(wynik == 5) {
            let string = "Gdzie dwóch lisów się bije tam trzeci korzysta!"
            return string;
        } else if(wynik == 6) {
            let string = "Każdy lis lubi kurczaki!";
            return string;
        } 
    }