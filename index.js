//Requirement Variables
const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require("ms");
const http = require('https');
const mcUtil = require('minecraft-server-util');
const cheerio = require('cheerio');
const request = require('request');
const fortniteAPI = require('fortnite-api-com');
const triviaDB = require('triviadb');
const { Console } = require('console');
const clear = require('./commands/clear');
const minfo = require('./commands/minfo')
const info = require('./commands/info');
const help = require('./commands/help');
const mute = require('./commands/mute');
const modhelp = require('./commands/modhelp');
const poll = require('./commands/poll');
const clearAll = require('./commands/clear-all');
const setprefix = require('./commands/setprefix');
const initiatespam = require('./commands/initiatespam');
const cinfo = require('./commands/cinfo');
const sinfo = require('./commands/sinfo');
const mc = require('./commands/mc');
const gi = require('./commands/gi');
const fn = require('./commands/fn');
const coinflip = require('./commands/coinflip');
const kick = require('./commands/kick');
const ban = require('./commands/ban');
const trivia = require('./commands/trivia');
const nick = require('./commands/nick');
const unban = require('./commands/unban');
const invitelist = require('./commands/invitelist');
const inv = require('./commands/inv');
const math = require('./commands/math');
const ss = require('./commands/ss');
const lockchannel = require('./commands/lockchannel');
const wiki = require('./commands/wiki');
const music = require('./commands/music');
const consolespam = require('./commands/consolespam');
const unmute = require('./commands/unmute');
const dev = require('./commands/dev');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN

//API configs
const fortniteConfig = {
    apikey: process.env.FORTNITE_API_TOKEN,
    language: "en",
    debug: true
};
var fortniteStats = new fortniteAPI(fortniteConfig);

//models
class PickleRickGuild {
    constructor(guildID, logChannel, stringMainRole, stringMuteRole) {
        this.guildID = guildID
        this.logChannel = logChannel
        this.stringMainRole = stringMainRole
        this.stringMuteRole = stringMuteRole
    }
    sendLogMessage(message, logMessage) {
        message.guild.channels.cache.get(this.logChannel).send(logMessage)
    }
}

//Init variables
var Prefix = 'pr!'; //default prefix, do pr!setprefix to update prefix
var logChannel = ['773172065263943704', '804692091724496907', '805733098297360406', '807615806988746783']
var mainRoles = ['member', 'ma homie']
var muteRoles = ['dood is shut', 'stfu']
var allowsDeleting = [true, false, true, true]
const guildInvites = new Map();

//Side Event Handlers
bot.on('ready', () => {
    console.log('The bot is online :).');
    bot.user.setActivity(`Do ${Prefix}help or ${Prefix}cmdlist`)
    bot.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => {
                guildInvites.set(guild.id, invites)
            })
            .catch(err => { console.log(err) })
    })
})

bot.on('inviteCreate', invite => {
    bot.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => {
                guildInvites.set(guild.id, invites)
            })
            .catch(err => { console.log(err) })
    })
    console.log(`Invite created: ${invite.url}`)
})

bot.on('inviteDelete', invite => {
    //refresh invites list
    bot.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => {
                guildInvites.set(guild.id, invites)
            })
            .catch(err => { console.log(err) })
    })
    console.log(`Invite deleted: ${invite.url}`)
})

bot.on('guildMemberAdd', guildMember => {
    var stringWelcomeRole;
    if (guildMember.guild.id == '773172065263943701') {
        stringWelcomeRole = 'member'
    }
    if (!stringWelcomeRole) return
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === stringWelcomeRole)
    console.log(welcomeRole)
    guildMember.roles.add(welcomeRole)
    guildMember.guild.systemChannel.send(`Welcome <@${guildMember.id}> to ${guildMember.guild.name}!`)
})

bot.on('disconnect', () => {
    console.log('Bot is disconnected or disconnecting.')
})

//Main Event Handler
bot.on('message', msg => {
    if (!msg.content.startsWith(Prefix)) return
    let args = msg.content.substring(Prefix.length).split(' ');
    var serverIndex
    if (msg.guild.id == '780685961079685120') {
        serverIndex = 1
    } else if (msg.guild.id == '805723501544603658'){
        serverIndex = 2
    } else if (msg.guild.id == '807599800379768862') {
        serverIndex = 3
    } else {
        serverIndex = 0
    }
    var stringMainRole;
    var stringMuteRole;
    if (msg.guild.id == '805723501544603658') {
        stringMainRole = mainRoles[1]
        stringMuteRole = muteRoles[1]
    } else if (msg.guild.id == '773172065263943701') {
        stringMainRole = mainRoles[0]
        stringMuteRole = muteRoles[0]
    } else if (msg.guild.id == '807599800379768862') {
        stringMainRole = 'verified'
        stringMuteRole = 'muted'
    }
    switch (args[0]) {
        case 'clear':
            clear.execute(msg, args, logChannel[serverIndex])
            break;
        case 'minfo':
            minfo.execute(msg, args, logChannel[serverIndex])
            break;
        case 'info':
            info.execute(msg, args, logChannel[serverIndex], Prefix)
            break;
        case 'help':
            help.execute(msg, args, logChannel[serverIndex])
            break;
        case 'mute':
            mute.execute(msg, args, logChannel[serverIndex], stringMainRole, stringMuteRole)
            break;
        case 'modhelp':
            modhelp.execute(msg, args, logChannel[serverIndex])
            break;
        case "poll":
            poll.execute(msg, args, logChannel[serverIndex])
            break;
        case 'clear-all':
            clearAll.execute(msg, args, logChannel[serverIndex])
            break;
        case "setprefix":
            Prefix = setprefix.execute(msg, args, logChannel[serverIndex])
            break;
        case 'unmute':
            unmute.execute(msg, args, logChannel[serverIndex])
            break;
        case 'initiatespam':
            initiatespam.execute(msg, args, logChannel[serverIndex])
            break;
        case 'cinfo':
            cinfo.execute(msg, args, logChannel[serverIndex])
            break;
        case 'sinfo':
            sinfo.execute(msg, args, logChannel[serverIndex])
            break;
        case 'mc':
            mc.execute(msg, args, logChannel[serverIndex])
            break;
        case 'gi':
            gi.execute(msg, args, logChannel[serverIndex])
            break;
        case 'fn':
            fn.execute(msg, args, logChannel[serverIndex], fortniteStats)
            break;
        case 'coinflip':
            coinflip.execute(msg, args, logChannel[serverIndex])
            break;
        case 'kick':
            kick.execute(msg, args, logChannel[serverIndex])
            break;
        case 'ban':
            ban.execute(msg, args, logChannel[serverIndex])
            break;
        case 'trivia':
            trivia.execute(msg, args, logChannel[serverIndex])
            break;
        case 'nick':
            nick.execute(msg, args, logChannel[serverIndex])
            break;
        case 'unban':
            unban.execute(msg, args, logChannel[serverIndex])
            break;
        case 'invitelist':
            invitelist.execute(msg, args, logChannel[serverIndex], guildInvites)
            break;
        case 'inv':
            inv.execute(msg, args, logChannel[serverIndex])
            break;
        case 'math':
            math.execute(msg, args, logChannel[serverIndex])
            break;
        case 'ss':
            let params = ss.execute(msg, args, logChannel[serverIndex], stringMainRole, stringMuteRole)
            stringMainRole = params.stringMainRole
            stringMuteRole = params.stringMuteRole
            logChannel[serverIndex] = params.logChannel
            allowsDeleting[serverIndex] = params.allowsDeleting
            break;
        case 'lockchannel':
            lockchannel.execute(msg, args, logChannel[serverIndex], stringMainRole)
            break;
        case 'wiki':
            wiki.execute(msg, args, logChannel[serverIndex])
            break;
        case 'music':
            music.execute(msg, args, logChannel[serverIndex])
            break;
        case 'lullyspamyconsole':
            consolespam.execute(msg, args, logChannel[serverIndex])
            break;
        case 'dev':
            dev.execute(msg, args, logChannel[serverIndex], bot)
            break;
    }
})

bot.on('messageDelete', deletedMessage => {
    var sendDeleteOrNot;
    var serverIndex;
    if (deletedMessage.guild.id == '773172065263943701') {
        if (allowsDeleting[0] == true) {
            sendDeleteOrNot = true
        } else {
            sendDeleteOrNot = false
        }
        serverIndex = 0
    } else if (deletedMessage.guild.id == '780685961079685120') {
        if (allowsDeleting[1] == true) {
            sendDeleteOrNot = true
        } else {
            sendDeleteOrNot = false
        }
        serverIndex = 1
    } else if (deletedMessage.guild.id == '807599800379768862') {
        if (allowsDeleting[3] == true) {
            sendDeleteOrNot = true
        } else {
            sendDeleteOrNot = false
        }
        serverIndex = 3
    } else {
        if (allowsDeleting[2] == true) {
            sendDeleteOrNot = true
        } else {
            sendDeleteOrNot = false
        }
        serverIndex = 2
    }
    if (sendDeleteOrNot == true) {
        deletedMessage.guild.channels.cache.get(logChannel[serverIndex]).send(`${deletedMessage.author.tag} deleted a message with the content \`${deletedMessage.content}\` in <#${deletedMessage.channel.id}>`)
    }
})
bot.login(process.env.DISCORD_TOKEN); //DISCORD_TOKEN is discord bot's token.
