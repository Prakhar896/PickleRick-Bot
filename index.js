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
const axios = require('axios');
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
const create = require('./commands/create');
const cmdlist = require('./commands/cmdlist');
const weather = require('./commands/weather');
const destroy = require('./commands/destroy');
const rinfo = require('./commands/rinfo');
const reactiveList = require('./commands/reactiveList');
const reactionAdd = require('./event-listeners/reactionAdd');
const guildMemberAdd = require('./event-listeners/guildMemberAdd');
const inviteDelete = require('./event-listeners/inviteDelete');
const inviteCreate = require('./event-listeners/inviteCreate');
const guildDelete = require('./event-listeners/guildDelete');
const guildCreate = require('./event-listeners/guildCreate');
const ready = require('./event-listeners/ready');
const messageDelete = require('./event-listeners/messageDelete');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN

//API configs
const fortniteConfig = {
    apikey: process.env.FORTNITE_API_TOKEN,
    language: "en",
    debug: true
};
var fortniteStats = new fortniteAPI(fortniteConfig);


//Init variables
var botTestingMode = true
var Prefix = 'pr!'; //default prefix, do pr!setprefix to update prefix
if (botTestingMode) {
    Prefix = 'prb!'
}
var creatorBypassMode = false
var rlMessagesList = []
//old server management
// var logChannel = ['773172065263943704', '804692091724496907', '805733098297360406', '807615806988746783']
// var mainRoles = ['member', 'ma homie']
// var muteRoles = ['dood is shut', 'stfu']
// var allowsDeleting = [true, false, true, true]

//new server management
var guilds = [];
var guildInvites = new Map();

//Side Event Handlers
bot.on('ready', () => {
    ready.execute(bot, guildInvites, guilds, Prefix)
        .then(responseArray => {
            guildInvites = responseArray[0]
            guilds = responseArray[1]
        })
})

bot.on('guildCreate', guild => {
    guildCreate.execute(guild, guilds)
        .then(updatedGuilds => {
            guilds = updatedGuilds
        })
})

bot.on('guildDelete', leftGuild => {
    guildDelete.execute(leftGuild, guilds)
        .then(updatedGuilds => {
            guilds = updatedGuilds
        })
})

bot.on('inviteCreate', invite => {
    inviteCreate.execute(invite, guildInvites, bot)
        .then(updatedGuildInvites => {
            guildInvites = updatedGuildInvites
        })
})

bot.on('inviteDelete', invite => {
    inviteDelete.execute(invite, guildInvites, bot)
        .then(updatedGuildInvites => {
            guildInvites = updatedGuildInvites
        })
})

bot.on('guildMemberAdd', guildMember => {
    guildMemberAdd.execute(guildMember, guilds)
})

bot.on("messageReactionAdd", async (reaction, user) => {
    reactionAdd.execute(reaction, user, rlMessagesList)
})

bot.on('disconnect', () => {
    console.log('Bot is disconnected or disconnecting.')
})

async function checkDowntime() {
    var status = false
    try {
        await axios({
            method: 'get',
            url: process.env.DT_SERVER_STATUS_URL
        })
            .then(async (response) => {
                if (response.statusText == 'OK' && (response.data == 'True' || response.data == 'False')) {
                    if (response.data == 'True') {
                        status = true
                    } else {
                        status = false
                    }
                } else {
                    console.log('Error in properly getting downtime status from the server.')
                    return
                }
            })
    } catch (err) {
        console.log('Error in checking downtime: ' + err)
        return
    }
    return status
}

//Main Event Handler
bot.on('message', async msg => {
    if (!msg.content.startsWith(Prefix)) return

    //Check downtime
    var status = await checkDowntime()
    if (status == true) {
        msg.reply('**You caught us at an unfortunate time.** This service is currently experiencing downtime. We will be back up shortly.')
        return
    }

    let args = msg.content.substring(Prefix.length).split(' ');
    let serverIndex = guilds.findIndex(guildData => guildData.id === msg.guild.id)
    if (serverIndex == undefined || serverIndex == -1) return msg.reply('There was a data error. This server is not in my backend servers list. Please contact my developers.')
    console.log(`Message occurred, guild info: ${guilds[serverIndex]}`)
    //Access guildData using params: msg, args, guildData, Prefix, bot, Discord
    switch (args[0]) {
        case 'clear':
            clear.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'minfo':
            minfo.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            let member = msg.guild.member(msg.author)
            break;
        case 'info':
            info.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'help':
            help.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'mute':
            mute.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'modhelp':
            modhelp.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case "poll":
            poll.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'clear-all':
            clearAll.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case "setprefix":
            Prefix = setprefix.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'unmute':
            unmute.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'initiatespam':
            initiatespam.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'cinfo':
            cinfo.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'sinfo':
            sinfo.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'mc':
            mc.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'gi':
            // gi.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord)
            msg.reply('Sorry, this command is currently inactive.')
            break;
        case 'fn':
            fn.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, fortniteStats, creatorBypassMode)
            break;
        case 'coinflip':
            coinflip.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'kick':
            kick.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'ban':
            ban.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'trivia':
            trivia.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'nick':
            nick.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'unban':
            unban.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'invitelist':
            invitelist.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, guildInvites, creatorBypassMode)
            break;
        case 'inv':
            inv.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'math':
            math.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'ss':
            let newGuildData = ss.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            if (!newGuildData.id) return
            guilds[serverIndex] = newGuildData
            console.log(newGuildData)
            break;
        case 'lockchannel':
            lockchannel.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'wiki':
            wiki.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'music':
            music.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'lullyspamyconsole':
            consolespam.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'dev':
            dev.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, guilds, creatorBypassMode, creatorBypassMode)
                .then(newState => {
                    if (newState != true && newState != false) return
                    if (newState == true) {
                        creatorBypassMode = true
                    } else {
                        creatorBypassMode = false
                    }
                })
            break;
        case 'suggest':
            suggest.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'assign':
            assign.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'unassign':
            unassign.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'create':
            create.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'cmdlist':
            cmdlist.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'weather':
            weather.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'destroy':
            destroy.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'rinfo':
            rinfo.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode)
            break;
        case 'rl':
            reactiveList.execute(msg, args, guilds[serverIndex], Prefix, bot, Discord, creatorBypassMode, rlMessagesList)
                .then(newRLMessagesList => {
                    if (typeof newRLMessagesList == 'object') {
                        if (newRLMessagesList.newRLData) {
                            rlMessagesList = newRLMessagesList["newRLData"]
                            console.log("rlMessagesList updated: " + rlMessagesList)
                        }
                    }
                })
            break;
    }
})

bot.on('messageDelete', deletedMessage => {
    messageDelete.execute(guilds, deletedMessage)
})

if (botTestingMode) {
    bot.login(process.env.DISCORD_BETA_TOKEN) //DISCORD_BETA_TOKEN is the beta discord bot's token
} else {
    bot.login(process.env.DISCORD_TOKEN) //DISCORD_TOKEN is official discord bot's token
}
