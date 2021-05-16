const discord = require('discord.js')
const db = require('quick.db');
const config = require('../config');
module.exports.run = (bot, message, args, prefix) => {
        if(message.author.id != config.ownerid) return message.channel.send("Ta komenda jest tylko i wyłącznie dla autora bota!");
        if(args[0] == "add") {
            db.set(`globalban${args[1]}`, "tak");
            message.channel.send("Globalban został pomyślnie dodany")
        } else if(args[0] == "remove") {
            db.set(`globalban${args[1]}`, "nie");
            message.channel.send("Global ban został pomyślnie usunięty.")
        } else {
            message.channel.send("Podaj  add lub remove")
        }
};


module.exports.help = {
    name: "globalban",
    aliases: ['gb']
};