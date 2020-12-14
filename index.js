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
const bypassandunmute = require('./commands/bypassandunmute');
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

const token = '' //if running locally

//API configs
const fortniteConfig = {
    apikey: "",
    language: "en",
    debug: true
};
var fortniteStats = new fortniteAPI(fortniteConfig);

//Init variables
var Prefix = 'pr!'; //default prefix, do pr!setprefix to update prefix
var logChannel = '773172065263943704';
var stringMainRole = 'normie'
var stringMuteRole = 'dood is shut'
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
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'normie')
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

    switch (args[0]) {
        case 'clear':
            clear.execute(msg, args, logChannel)
            break;
        case 'minfo':
            minfo.execute(msg, args, logChannel)
            break;
        case 'info':
            info.execute(msg, args, logChannel, Prefix)
            break;
        case 'help':
            help.execute(msg, args, logChannel)
            break;
        case 'mute':
            mute.execute(msg, args, logChannel)
            break;
        case 'modhelp':
            modhelp.execute(msg, args, logChannel)
            break;
        case "poll":
            poll.execute(msg, args, logChannel)
            break;
        case 'clear-all':
            clearAll.execute(msg, args, logChannel)
            break;
        case "setprefix":
            Prefix = setprefix.execute(msg, args, logChannel)
            break;
        case 'bypassandunmute':
            bypassandunmute.execute(msg, args, logChannel)
            break;
        case 'initiatespam':
            initiatespam.execute(msg, args, logChannel)
            break;
        case 'cinfo':
            cinfo.execute(msg, args, logChannel)
            break;
        case 'sinfo':
            sinfo.execute(msg, args, logChannel)
            break;
        case 'mc':
            mc.execute(msg, args, logChannel)
            break;
        case 'gi':
            gi.execute(msg, args, logChannel)
            break;
        case 'fn':
            fn.execute(msg, args, logChannel, fortniteStats)
            break;
        case 'coinflip':
            coinflip.execute(msg, args, logChannel)
            break;
        case 'kick':
            kick.execute(msg, args, logChannel)
            break;
        case 'ban':
            ban.execute(msg, args, logChannel)
            break;
        case 'trivia':
            trivia.execute(msg, args, logChannel)
            break;
        case 'nick':
            nick.execute(msg, args, logChannel)
            break;
        case 'unban':
            unban.execute(msg, args, logChannel)
            break;
        case 'invitelist':
            invitelist.execute(msg, args, logChannel, guildInvites)
            break;
        case 'inv':
            inv.execute(msg, args, logChannel)
            break;
        case 'math':
            math.execute(msg, args, logChannel)
            break;
        case 'ss':
            let params = ss.execute(msg, args, logChannel, stringMainRole, stringMuteRole)
            stringMainRole = params.stringMainRole
            stringMuteRole = params.stringMuteRole
            logChannel = params.logChannel
            break;
        case 'lockchannel':
            lockchannel.execute(msg, args, logChannel, stringMainRole)
            break;
    }
})

bot.login(token); //BOT_TOKEN is client secret