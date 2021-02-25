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
const suggest = require('./commands/suggest');
const assign = require('./commands/assign');
const unassign = require('./commands/unassign');
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
//old server management
// var logChannel = ['773172065263943704', '804692091724496907', '805733098297360406', '807615806988746783']
// var mainRoles = ['member', 'ma homie']
// var muteRoles = ['dood is shut', 'stfu']
// var allowsDeleting = [true, false, true, true]

//new server management
var guilds = [];
const guildInvites = new Map();

//Side Event Handlers
bot.on('ready', () => {
    console.log('The bot is online :).');
    bot.user.setActivity(`${Prefix}help`)
    bot.guilds.cache.forEach(guild => {
        //Invites
        guild.fetchInvites()
            .then(invites => {
                guildInvites.set(guild.id, invites)
            })
            .catch(err => {
                console.log('Fetching Invites Error: ' + err)
            })
        //Setting guilds and their info
        guilds.push({ id: guild.id, name: guild.name, logChannel: undefined, mainRole: '', muteRole: '', allowsDeleting: false })
    })
    let backEndChannel = bot.guilds.cache.get('805723501544603658').channels.cache.get('805733098297360406')
    backEndChannel.send('Would you like to autoset guild data to custom guilds?')
    //collector, for now, just autoset but itself
    var index = 0
    for (const guildData of guilds) {
        if (guildData.id == '773172065263943701') {
            //Smart People Server
            guilds[index].logChannel = '773172065263943704'
            guilds[index].mainRole = 'member'
            guilds[index].muteRole = 'dood is shut'
            guilds[index].allowsDeleting = true
        } else if (guildData.id == '780685961079685120') {
            //Ngee ann's maga party
            guilds[index].logChannel = '804692091724496907'
            guilds[index].mainRole = ''
            guilds[index].muteRole = ''
            guilds[index].allowsDeleting = false
        } else if (guildData.id == '807599800379768862') {
            //3r4, discord's better than whatsapp
            guilds[index].logChannel = '807615806988746783'
            guilds[index].mainRole = 'verified'
            guilds[index].muteRole = 'muted'
            guilds[index].allowsDeleting = false
        } else if (guildData.id == '696270592135135242') {
            //NASS Robotics
            guilds[index].logChannel = '812321866923376670'
            guilds[index].mainRole = 'Robotics Club Members'
            guilds[index].muteRole = 'shut'
            guilds[index].allowsDeleting = true
        } else if (guildData.id == '805723501544603658') {
            //Backend Server: idk
            guilds[index].logChannel = '805733098297360406'
            guilds[index].mainRole = 'ma homie'
            guilds[index].muteRole = 'stfu'
            guilds[index].allowsDeleting = true
        }
        index += 1
    }
    console.log(guilds)
})

bot.on('guildCreate', guild => {
    guilds.push({ id: guild.id, name: guild.name, logChannel: undefined, mainRole: '', muteRole: '', allowsDeleting: false })
    console.log('Joined guild: ' + guild.name)
    guild.systemChannel.send('Hey there! Thanks for addding me! To get started, run \`pr!ss help\` to find out the different mod commands and settings for this bot.')
})

bot.on('guildDelete', leftGuild => {
    let serverIndex = guilds.findIndex(guildData => guildData.id === leftGuild.id)
    if (serverIndex == -1 || serverIndex == undefined) return console.log('Fatal Guild Removing Error, Left Guild Data: ' + leftGuild)
    guilds.splice(serverIndex, 1)
    console.log('Left guild: ' + leftGuild.name)
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
    let serverIndex = guilds.findIndex(guildData => guildData.id === msg.guild.id)
    if (serverIndex == undefined || serverIndex == -1) return msg.reply('There was a data error. This server is not in my backend servers list. Please contact my developers.')
    console.log(`Message occurred, guild info: ${guilds[serverIndex]}`)
    
    //Access guildData using params: msg, args, guildData, Prefix, bot, Discord
    switch (args[0]) {
        case 'clear':
            clear.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'minfo':
            minfo.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'info':
            info.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'help':
            help.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'mute':
            mute.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'modhelp':
            modhelp.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case "poll":
            poll.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'clear-all':
            clearAll.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case "setprefix":
            Prefix = setprefix.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'unmute':
            unmute.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'initiatespam':
            initiatespam.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'cinfo':
            cinfo.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'sinfo':
            sinfo.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'mc':
            mc.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'gi':
            gi.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'fn':
            fn.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, fortniteStats)
            break;
        case 'coinflip':
            coinflip.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'kick':
            kick.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'ban':
            ban.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'trivia':
            trivia.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'nick':
            nick.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'unban':
            unban.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'invitelist':
            invitelist.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, guildInvites)
            break;
        case 'inv':
            inv.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'math':
            math.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'ss':
            let newGuildData = ss.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            if (!newGuildData.id) return
            guilds[serverIndex] = newGuildData
            break;
        case 'lockchannel':
            lockchannel.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'wiki':
            wiki.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'music':
            music.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'lullyspamyconsole':
            consolespam.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'dev':
            dev.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, guilds)
            break;
        case 'suggest':
            suggest.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'assign':
            assign.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            break;
        case 'unassign':
            unassign.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
    }
})

bot.on('messageDelete', deletedMessage => {
    let serverIndex = guilds.findIndex(guildData => guildData.id === deletedMessage.guild.id)
    if (serverIndex == undefined || serverIndex == -1) return console.log(`Error in Getting Server Index when trying to log deleted message due to data error. Deleted Message: ${deletedMessage.content}, Guild ID and Name: ${deletedMessage.guild.id}, ${deletedMessage.guild.name}`)
    if (guilds[serverIndex].allowsDeleting == true) {
        deletedMessage.guild.channels.cache.get(guilds[serverIndex].logChannel).send(`${deletedMessage.author.tag} deleted a message with the content \`${deletedMessage.content}\` in <#${deletedMessage.channel.id}>`)
    }
})
bot.login(process.env.DISCORD_TOKEN); //DISCORD_TOKEN is discord bot's token.
