const discord = require('discord.js')
let db = require('quick.db')
const shortid = require('shortid');
module.exports.run = async(bot, message, args, prefix) => {
        if(message.member.hasPermission("ADMINISTRATOR")) {
             if(args[0] == "prefix") {
                 if(!args[1]) {
                    const embed = new discord.MessageEmbed()
                    .setTitle("Zły prefix.")
                    .setDescription("Prefix nie może być emotką lub nie może być pusty.")
                    .setColor("#ff2200")
                    message.channel.send(embed);
                  } else {
                 db.set(`prefix${message.guild.id}`, args[1]);
                  const embed = new discord.MessageEmbed()
                  .setTitle("Ustawiono")
                  .setDescription('Prefix został ustawiony na `' + args[1] + '`')
                  .setColor("#15ff00")
                  message.channel.send(embed);
                    }
               } else if(args[0] == "welcome_channel") {
                   if(args[1]) {
                    if(message.mentions.channels.first()) {
                        const id = message.mentions.channels.first().id;
                        db.set(`welcomechannel${message.guild.id}`, id);
                        const embed = new discord.MessageEmbed()
                        .setTitle("Ustawiono")
                        .setDescription('Welcome Channel został ustawiony na wybrany przez Ciebie kanał')
                        .setColor("#15ff00")
                        message.channel.send(embed);
                        console.log(id);
                    } else {
                        const embed = new discord.MessageEmbed()
                        .setTitle("Nie podałeś wartości.")
                        .setDescription("Oznacz prawidłowo kanał!")
                       .setColor("#ff2200")
                       message.channel.send(embed);
                    }
                } else {
                    const embed = new discord.MessageEmbed()
                    .setTitle("Zły kanał")
                    .setDescription("Kanał nie może być pusty.")
                    .setColor("#ff2200")
                    message.channel.send(embed);
                }
               } else if(args[0] == "welcome_message") {
                    if(!args[1]) {
                        const embed = new discord.MessageEmbed()
                        .setTitle("Zła wiadomość")
                        .setDescription("wiadomość nie może być pusta. \n \n `{member_name}` - Nazwa osoby dołączającej \n `{guild_name}` - nazwa serwera \n `{osoba}` - Informacja którą osobą jest użytkownik dołączający.")
                        .setColor("#ff2200")
                        message.channel.send(embed);
                    } else {
                        const wm = args.slice(1).join(' ');
                        db.set(`welcomemessage${message.guild.id}`, wm);
                        const embed = new discord.MessageEmbed()
                        .setTitle("Ustawiono")
                        .setDescription('Welcome Message zostało ustawione na `' + wm + '`' )
                        .setColor("#15ff00")
                        console.log(wm);
                        message.channel.send(embed);
                    }
               } else if(args[0] == "goodbye_channel") {
                if(args[1]) {
                    if(message.mentions.channels.first()) {
                        const id = message.mentions.channels.first().id;
                        db.set(`goodbyechannel${message.guild.id}`, id);
                        const embed = new discord.MessageEmbed()
                        .setTitle("Ustawiono")
                        .setDescription('Goodbye Channel został ustawiony na wybrany przez Ciebie kanał')
                        .setColor("#15ff00")
                        message.channel.send(embed);
                        console.log(id);
                    } else {
                        const embed = new discord.MessageEmbed()
                        .setTitle("Nie podałeś wartości.")
                        .setDescription("Oznacz prawidłowo kanał!")
                       .setColor("#ff2200")
                       message.channel.send(embed);
                    }
                } else {
                    const embed = new discord.MessageEmbed()
                    .setTitle("Zły kanał")
                    .setDescription("Kanał nie może być pusty.")
                    .setColor("#ff2200")
                    message.channel.send(embed);
                }
               } else if(args[0] == "goodbye_message") {
                if(!args[1]) {
                    const embed = new discord.MessageEmbed()
                    .setTitle("Zła wiadomość")
                    .setDescription("wiadomość nie może być pusta. \n \n `{member_name}` - Nazwa osoby opuszczającej \n `{guild_name}` - nazwa serwera \n `{osoba}` - ilość pozostałych osób")
                    .setColor("#ff2200")
                    message.channel.send(embed);
                } else {
                    const wm = args.slice(1).join(' ');
                    db.set(`goodbyemessage${message.guild.id}`, wm);
                    const embed = new discord.MessageEmbed()
                    .setTitle("Ustawiono")
                    .setDescription('Goodbye Message zostało ustawione na `' + wm + '`' )
                    .setColor("#15ff00")
                    console.log(wm);
                    message.channel.send(embed);
                }
               } else if(args[0] == "logs_channel") { 
                if(args[1]) {
                    if(message.mentions.channels.first()) {
                        const id = message.mentions.channels.first().id;
                        db.set(`logschannel${message.guild.id}`, id);
                        const embed = new discord.MessageEmbed()
                        .setTitle("Ustawiono")
                        .setDescription('Logs Channel został ustawiony na wybrany przez Ciebie kanał')
                        .setColor("#15ff00")
                        message.channel.send(embed);
                        console.log(id);
                    } else {
                        const embed = new discord.MessageEmbed()
                        .setTitle("Nie podałeś wartości.")
                        .setDescription("Oznacz prawidłowo kanał!")
                       .setColor("#ff2200")
                       message.channel.send(embed);
                    }
                } else {
                    const embed = new discord.MessageEmbed()
                    .setTitle("Zły kanał")
                    .setDescription("Kanał nie może być pusty.")
                    .setColor("#ff2200")
                    message.channel.send(embed);
                }
               } else if(args[0] == "verify_channel") {
                if(args[1]) {
                    if(message.mentions.channels.first()) {
                        const id = message.mentions.channels.first().id;
                        db.set(`verifychannel${message.guild.id}`, id);
                        db.set(`verifycode${message.guild.id}`, shortid.generate().toString());
                        const ch = message.mentions.channels.first();
                        let role = message.guild.roles.cache.find(x => x.id == db.get(`verifyrole${message.guild.id}`));
                        try {
                        db.set(`verifyrole${message.guild.id}`, role.id)
                        } catch(e) {
                        role = await message.guild.roles.create({
                         data: {
                          name: 'Zweryfikowany',
                          color: 'GREEN',
                            },
                             reason: 'Weryfikacja',
                            });
                            db.set(`verifyrole${message.guild.id}`, role.id);    
                        }
                        const e = new discord.MessageEmbed()
                        .setTitle('Weryfikacja')
                        .setDescription(`Wpisz kod ${db.get(`verifycode${message.guild.id}`)} \n Aby otrzymać dostęp do wszystkich kanałów`)
                        .setColor('#0dff00')
                        ch.send(e);
                        const embed = new discord.MessageEmbed()
                        .setTitle("Ustawiono")
                        .setDescription('Verify Channel został ustawiony na wybrany przez Ciebie kanał')
                        .setColor("#15ff00")
                        message.channel.send(embed);
                        console.log(id);
                    } else {
                        const embed = new discord.MessageEmbed()
                        .setTitle("Nie podałeś wartości.")
                        .setDescription("Oznacz prawidłowo kanał!")
                       .setColor("#ff2200")
                       message.channel.send(embed);
                    }
                } else {
                    const embed = new discord.MessageEmbed()
                    .setTitle("Zły kanał")
                    .setDescription("Kanał nie może być pusty.")
                    .setColor("#ff2200")
                    message.channel.send(embed);
                }
               } else if(args[0] == "antyinvite") { 
                   if(args[1]) {
                        if(args[1] == "true") {
                            db.set(`antyinvite${message.guild.id}`, "true");
                            const embed = new discord.MessageEmbed()
                            .setTitle("Ustawiono")
                            .setDescription('Funkcja antyinvite została pomyślnie włączona!')
                            .setColor("#15ff00")
                            message.channel.send(embed);
                        } else if(args[1] == "false") {
                            db.set(`antyinvite${message.guild.id}`, "false");
                            const embed = new discord.MessageEmbed()
                            .setTitle("Ustawiono")
                            .setDescription('Funkcja antyinvite została pomyślnie wyłączona!')
                            .setColor("#15ff00")
                            message.channel.send(embed);
                        } else {
                            const embed = new discord.MessageEmbed()
                            .setTitle("Zła wartość")
                            .setDescription("wartość musi wynosić albo true albo false.")
                            .setColor("#ff2200")
                            message.channel.send(embed);
                        }
                    } else {
                        const embed = new discord.MessageEmbed()
                        .setTitle("Zła wartość")
                        .setDescription("wartość nie może być pusta i musi wynosić albo true albo false.")
                        .setColor("#ff2200")
                        message.channel.send(embed);
                    }
               } else if(args[0] == "levels") {
                if(args[1]) {
                    if(args[1] == "true") {
                        db.set(`levels${message.guild.id}`, "true");
                        const embed = new discord.MessageEmbed()
                        .setTitle("Ustawiono")
                        .setDescription('Funkcja levels została pomyślnie włączona!')
                        .setColor("#15ff00")
                        message.channel.send(embed);
                    } else if(args[1] == "false") {
                        db.set(`levels${message.guild.id}`, "false");
                        const embed = new discord.MessageEmbed()
                        .setTitle("Ustawiono")
                        .setDescription('Funkcja levels została pomyślnie wyłączona!')
                        .setColor("#15ff00")
                        message.channel.send(embed);
                    } else {
                        const embed = new discord.MessageEmbed()
                        .setTitle("Zła wartość")
                        .setDescription("wartość musi wynosić albo true albo false.")
                        .setColor("#ff2200")
                        message.channel.send(embed);
                    }
                } else {
                    const embed = new discord.MessageEmbed()
                    .setTitle("Zła wartość")
                    .setDescription("wartość nie może być pusta i musi wynosić albo true albo false.")
                    .setColor("#ff2200")
                    message.channel.send(embed);
                }
            
            } else {
                const embed = new discord.MessageEmbed()
                .setTitle("Nieprawidłowa opcja.")
                .setDescription("Nieprawidłowa opcja. \n \n Możliwe opcje: `verify_channel`, `welcome_message`, `welcome_channel`, `levels`, `prefix`, `logs_channel` \n \n Możliwe wartości: \n `welcome_message`:\n `{member_name}` - nazwa osoby dołączającej \n `{guild_name}` - nazwa serwera na który dołącza \n `{osoba}` - informacja którą osobą jest dany użytkownik. \n \n `goodbye_message:` \n `{member_name}` - nazwa osoby opuszczającej \n `{guild_name}` - nazwa serwera który opuszcza \n `{osoba}` - liczba pozostałych osób na serwerze")
                .setColor("#ff2200")
               message.channel.send(embed);
                }
        } else {
            const embed = new discord.MessageEmbed()
            .setTitle("Nie posiadasz uprawnień.")
            .setDescription("Nie masz uprawnienia ADMINISTRATOR")
           .setColor("#ff2200")
           message.channel.send(embed);
        }
};

module.exports.help = {
    name: "config",
    aliases: ['ustawienia']
}