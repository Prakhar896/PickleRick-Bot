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
var botTestingMode = false
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
        guilds.push({ id: guild.id, name: guild.name, logChannel: undefined, mainRole: '', muteRole: '', allowsDeleting: false, autorolesEnabled: false, giProfanityFilterEnabled: false })
    })
    let backEndChannel = bot.guilds.cache.get('805723501544603658').channels.cache.get('805733098297360406')
    backEndChannel.send('Would you like to autoset guild data to custom guilds?')
    //collector, for now, just autoset by itself
    var index = 0
    for (const guildData of guilds) {
        if (guildData.id == '773172065263943701') {
            //Smart People Server
            guilds[index].logChannel = '773172065263943704'
            guilds[index].mainRole = 'member'
            guilds[index].muteRole = 'dood is shut'
            guilds[index].allowsDeleting = true
            guilds[index].autorolesEnabled = true
        } else if (guildData.id == '780685961079685120') {
            //Ngee ann's maga party
            guilds[index].logChannel = '804692091724496907'
            guilds[index].mainRole = ''
            guilds[index].muteRole = ''
            guilds[index].allowsDeleting = false
            guilds[index].autorolesEnabled = false
            guilds[index].giProfanityFilterEnabled = true
        } else if (guildData.id == '807599800379768862') {
            //3r4, discord's better than whatsapp
            guilds[index].logChannel = '807615806988746783'
            guilds[index].mainRole = 'verified'
            guilds[index].muteRole = 'muted'
            guilds[index].allowsDeleting = true
            guilds[index].autorolesEnabled = true
            guilds[index].giProfanityFilterEnabled = true
        } else if (guildData.id == '696270592135135242') {
            //NASS Robotics
            guilds[index].logChannel = '812321866923376670'
            guilds[index].mainRole = 'Robotics Club Members'
            guilds[index].muteRole = 'shut'
            guilds[index].allowsDeleting = true
            guilds[index].autorolesEnabled = true
        } else if (guildData.id == '805723501544603658') {
            //Backend Server
            guilds[index].logChannel = '805733098297360406'
            guilds[index].mainRole = 'ma homie'
            guilds[index].muteRole = 'stfu'
            guilds[index].allowsDeleting = true
            guilds[index].autorolesEnabled = true
            guilds[index].giProfanityFilterEnabled = true
        } else if (guildData.id == '815050446766080040') {
            //Running Server
            guilds[index].logChannel = '815094333799006218'
            guilds[index].mainRole = 'member'
            guilds[index].allowsDeleting = true
            guilds[index].autorolesEnabled = false
        } else if (guildData.id == '814661841451483166') {
            // The Study Corner Server
            guilds[index].logChannel = '816277234599985163'
            guilds[index].mainRole = 'Member'
            guilds[index].muteRole = 'Muted'
            guilds[index].allowsDeleting = true
            guilds[index].autorolesEnabled = true
        } else if (guildData.id == '816517340190736424') {
            // meme founders gang server
            guilds[index].logChannel = '816581576980693004'
            guilds[index].mainRole = 'employee'
            guilds[index].muteRole = 'shut up'
            guilds[index].allowsDeleting = true
            guilds[index].autorolesEnabled = true
        } else if (guildData.id == '836808479099453460') {
            // stumble gamers server
            guilds[index].logChannel = '836962402796306472'
            guilds[index].mainRole = 'admin'
            guilds[index].allowsDeleting = true
            guilds[index].autorolesEnabled = true
        } else if (guildData.id == '853148400693805117') {
            //nickels server
            guilds[index].logChannel = '853150722317484042'
            guilds[index].mainRole = 'nickeler'
            guilds[index].muteRole = 'bad boi'
            guilds[index].allowsDeleting = true
            guilds[index].autorolesEnabled = true
            guilds[index].giProfanityFilterEnabled = true
        } else if (guildData.id == "909686440525459536") {
            guilds[index].logChannel = '910002422301212692'
            guilds[index].mainRole = 'man is alright'
        }
        index += 1
    }
    console.log(guilds)
})

bot.on('guildCreate', guild => {
    guilds.push({ id: guild.id, name: guild.name, logChannel: undefined, mainRole: '', muteRole: '', allowsDeleting: false, autorolesEnabled: false, giProfanityFilterEnabled: false })
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
    var roleString;
    for (guildData of guilds) {
        if (guildData.id == guildMember.guild.id) {
            if (guildData.autorolesEnabled == true) {
                if (!guildData.mainRole) return guildMember.guild.systemChannel.send(`An error (could not find main role) occurred in adding the main role to the new member ${guildMember.user.tag}. Please set the main role again using \`${Prefix}ss setmainrole <main role with spaces replaced with %>\``)
                roleString = guildData.mainRole
                var role = guildMember.guild.roles.cache.find(r => r.name === roleString)
                if (!role) return guildMember.guild.systemChannel.send(`The role, \'${roleString}\', that has been set in my records does not exist. Failed to assign the role using AutoRoles. Please re-set the role using \`${Prefix}ss setmainrole <main role with spaces replaced with %>\``)
                guildMember.roles.add(role)
                    .then(member => {
                        guildMember.guild.systemChannel.send(`Welcome <@${member.id}> to ${member.guild.name}!`)
                    })
                    .catch(err => {
                        guildMember.guild.systemChannel.send('An error occurred in adding the main role to the new member via the AutoRoles system. Please ensure that I have Administrator permissions.')
                        console.log('AutoRoles Error (Failed to add role to member): ' + err)
                        return
                    })
                return
            } else {
                return
            }
        }
    }
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
    }
})

bot.on('messageDelete', deletedMessage => {
    let serverIndex = guilds.findIndex(guildData => guildData.id === deletedMessage.guild.id)
    if (serverIndex == undefined || serverIndex == -1) return console.log(`Error in Getting Server Index when trying to log deleted message due to data error. Deleted Message: ${deletedMessage.content}, Guild ID and Name: ${deletedMessage.guild.id}, ${deletedMessage.guild.name}`)
    if (guilds[serverIndex].allowsDeleting == true) {
        deletedMessage.guild.channels.cache.get(guilds[serverIndex].logChannel).send(`${deletedMessage.author.tag} deleted a message with the content \`${deletedMessage.content}\` in <#${deletedMessage.channel.id}>`)
    }
})
if (botTestingMode) {
    bot.login(process.env.DISCORD_BETA_TOKEN) //DISCORD_BETA_TOKEN is the beta discord bot's token
} else {
    bot.login(process.env.DISCORD_TOKEN) //DISCORD_TOKEN is official discord bot's token
}
