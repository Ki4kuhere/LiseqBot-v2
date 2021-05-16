const discord = require('discord.js');
const bot = new discord.Client();
const db = require('quick.db');
const config = require('./config');
const fs = require('fs');
global.talkedRecently = new Set();

const activities = [
    "Wersja 2.0.1 już dostępna!",
    "Aktualizuje się..",
    "Uczy się...",
    "Nowe komendy!",
  ];

bot.on("ready", () => {
    setInterval(() => {
        // generate random number between 1 and list length.
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex];
    
        bot.user.setActivity(newActivity);
      }, 10000);

    console.log("Bot został pomyślnie włączony")
    console.log("Jestem na " + bot.guilds.cache.size + " serwerach.")
    console.log("Obsługuje mnie " + bot.users.cache.size + " osób.")
});
//Event weryfikacyjny
bot.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.id == db.get(`verifychannel${message.guild.id}`)) {
        if (message.content == db.get(`verifycode${message.guild.id}`)) {
            message.member.roles.add(db.get(`verifyrole${message.guild.id}`));
            const embed = new discord.MessageEmbed()
                .setTitle('Zweryfikowales sie pomyslnie!')
                .setDescription('Zweryfikowałeś się pomyślnie i masz dostęp do wszystkich kanałów!')
            message.author.send(embed);
            message.delete();
        } else {
            message.delete();
        }
    }
});

bot.on('message', message => {
    if(db.get(`levels${message.guild.id}`) == null || db.get(`levels${message.guild.id}`) == "false") return;
    if(message.author.bot) return;
    if(message.content.length == 1 || message.content.length == 2) return;
    if(db.get(`xp_${message.guild.id}_${message.author.id}`) == null) db.set(`xp_${message.guild.id}_${message.author.id}`, 0);
    if(db.get(`level_${message.guild.id}_${message.author.id}`) == null) db.set(`level_${message.guild.id}_${message.author.id}`, 1);
    if(db.get(`xp_${message.guild.id}_${message.author.id}`) == db.get(`level_${message.guild.id}_${message.author.id}`) * 6) {
        db.add(`level_${message.guild.id}_${message.author.id}`, 1);
        const e = new discord.MessageEmbed()
        .setTitle('Nowy poziom!')
        .setDescription(`GG **${message.author.username}** Osiągnąłeś nowy poziom - ${db.get(`level_${message.guild.id}_${message.author.id}`)}`)
        .setThumbnail(message.author.displayAvatarURL({dynamic:false}))
        .setColor('#03fc07')
        message.channel.send(e);
    } else {
        db.add(`xp_${message.guild.id}_${message.author.id}`, 1);
    }
}); 


//Funkcja antyinvite
bot.on('message', message => {
    if (db.get(`antyinvite${message.guild.id}`) == null || db.get(`antyinvite${message.guild.id}` == false)) return;
    if (message.content.includes('https://discord.gg/') || message.content.includes('discord.gg')) {
        if (message.member.hasPermission('ADMINISTRATOR')) return;
        message.delete();
        const e = new discord.MessageEmbed()
            .setTitle('AntyInvite!')
            .setDescription(`Osoba o nicku ${message.author.tag} wysłała zaproszenie na serwer discord! \n Wiadomość została pomyślnie usunięta. \n Aby zbanować/wyrzucić tą osobę wpisz: \n \n l!ban @osoba [powód] \n \n lub \n \n l!kick @osoba [powód]`)
            .setFooter('Aby wyłączyć tą funkcję wpisz l!config antyinvite false`')
            .setColor('#fc4903')
        message.channel.send(e);
    }
});

bot.on('messageDelete', async message => {
    // Ignore direct messages
    if (!message.guild) return;
    const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_DELETE',
    });
    const ch = message.guild.channels.cache.find(f => f.id === db.get(`logschannel${message.guild.id}`));
    const deletionLog = fetchedLogs.entries.first();
    if (deletionLog) {
        const {
            executor,
            target
        } = deletionLog;
        if (target.id === message.author.id) {
            if(ch == null || ch == undefined) return;
            const e = new discord.MessageEmbed()
                .setTitle('Ktoś usunął wiadomość!')
                .setDescription(`Osoba o nicku ${executor.tag} usuneła wiadomość osoby o nicku ${message.author}.`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: false
                }))
            ch.send(e);
        }
    }
});

//join_message
bot.on('guildMemberAdd', async (member) => {
    if (member.user.bot) return;
    let welcome_channel = db.get(`welcomechannel${member.guild.id}`);
    let welcome_message = db.get(`welcomemessage${member.guild.id}`);
    let ch = member.guild.channels.cache.find(ch => ch.id === welcome_channel);
    let wm = welcome_message.replace("{member_name}", "**" + member.user.username + "**").replace("{guild_name}", "**" + member.guild.name + "**").replace("{osoba}", "**" + member.guild.members.cache.size + "**");
    const embed = new discord.MessageEmbed()
        .setTitle('Ktoś dołączył na serwer!')
        .setColor('#00ff44')
        .setDescription(wm)
        .setThumbnail(member.user.displayAvatarURL({
            dynamic: false
        }));
    ch.send(embed);

});

//ban
bot.on('guildBanAdd', async (guild, member) => {
    const logs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
    });
    const log = logs.entries.first();
    const {
        executor,
        target
    } = log;
    if (target.id == member.id) {
        const e = new discord.MessageEmbed()
            .setTitle('Użytkownik został zbanowany!')
            .setDescription(`Osoba o nicku ${executor.tag} zbanowała osobę o nicku ${target.tag}`)
            .setThumbnail(target.displayAvatarURL({
                dynamic: false
            }))
        guild.channels.cache.find(ch => ch.id === db.get(`logschannel${guild.id}`)).send(e);
    }
});
//kick
bot.on('guildMemberRemove', async (member) => {
    const logs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_KICK',
    });
    const log = logs.entries.first();
    if (!log) return;
    const {
        executor,
        target
    } = log;
    if (target.id == member.id) {
        const e = new discord.MessageEmbed()
            .setTitle('Użytkownik został wyrzucony!')
            .setDescription(`Osoba o nicku ${executor.tag} wyrzuciła osobę o nicku ${target.tag}`)
            .setThumbnail(target.displayAvatarURL({
                dynamic: false
            }))
        if (db.get(`logschannel${guild.id}` == null)) return;
        member.guild.channels.cache.find(ch => ch.id === db.get(`logschannel${guild.id}`)).send(e);
    }
});

//goodbye_message
bot.on('guildMemberRemove', async (member) => {
    if (member.user.bot) return;
    let welcome_channel = db.get(`goodbyechannel${member.guild.id}`);
    let welcome_message = db.get(`goodbyemessage${member.guild.id}`);
    let wm = welcome_message.replace("{member_name}", "**" + member.user.username + "**").replace("{guild_name}", "**" + member.guild.name + "**").replace("{osoba}", "**" + member.guild.members.cache.size + "**");
    const embed = new discord.MessageEmbed()
        .setTitle('Ktoś opuścił serwer!')
        .setColor('#00ff44')
        .setDescription(wm)
        .setThumbnail(member.user.displayAvatarURL({
            dynamic: false
        }))
    let ch = member.guild.channels.cache.find(ch => ch.id === welcome_channel);
    ch.send(embed);
});

//bot mention
bot.on('message', message => {
    if (db.get(`globalban${message.author.id}`) == "tak") return;
    if (message.mentions.users.first() == bot.user) {
        let prefix = db.get(`prefix${message.guild.id}`);
        if (prefix == null) prefix = "l!"
        let e = new discord.MessageEmbed()
            .setTitle(`Oznaczyles mnie!`)
            .setDescription(`Mój prefix to ${prefix} \n Wpisz ${prefix}pomoc aby otrzymać pomoc.`)
            .setColor('#ff0000')
        message.channel.send(e)
    }
});

//load cmds
bot.cmds = new discord.Collection();

fs.readdir('./cmds', (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Nie mozna znalezc zadnych komend");
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${f} zaladowane!`);
        bot.cmds.set(props.help.name, props);
    });
    console.log('Wszystkie komendy zostaly zaladowane!');
});


//command handler
bot.on("message", async (message) => {
    db.set(`talkedrecently`, talkedRecently);
    if (db.get(`globalban${message.author.id}`) == "tak") return;
    if (message.channel.type === 'dm') return;
    let prefix = db.get(`prefix${message.guild.id}`);
    if (prefix == null) prefix = config.default_prefix;
    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(prefix.length).toLowerCase();
    const cmd = bot.cmds.get(command) || bot.cmds.find(a => a.help.aliases && a.help.aliases.includes(command));
    if (cmd) {
        if (command == "work" || command == "crime") {
            if (talkedRecently.has(message.author.id)) {
                const e = new discord.MessageEmbed()
                    .setTitle('Poczekaj!!')
                    .setDescription('Nie tak szybko, aby użyć tej komendy ponownie musisz poczekać 15 sekund!')
                    .setColor('#ff0d00')
                    message.channel.send(e);
                    return;
                }
            console.log("Osoba o nicku " + message.author.username + " uzyla komendy " + message.content + " \n Na serwerze " + message.guild.name);
            cmd.run(bot, message, args, prefix);
        } else {
            console.log("Osoba o nicku " + message.author.username + " uzyla komendy " + message.content + " \n Na serwerze " + message.guild.name);
            cmd.run(bot, message, args, prefix);
        }
    } else {}
});

//bot logging
bot.login(config.token)