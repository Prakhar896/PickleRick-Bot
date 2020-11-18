//Requirement Variables
const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require("ms");
const http = require('https');
const mcUtil = require('minecraft-server-util');
const cheerio = require('cheerio');
const request = require('request');
const fortniteAPI = require('fortnite-api-com');
const token = '<your token here>'; //if running locally

//API configs
const fortniteConfig = {
    apikey: "<fortnite-api.com API Key here>",
    language: "en",
    debug: true
};
var fortniteStats = new fortniteAPI(fortniteConfig);

//Init variables
var Prefix = 'pr!'; //default prefix, do $setprefix to update prefix
var logChannel = '773172065263943704';
var stringMainRole = 'normie'
var stringMuteRole = 'dood is shut'

//Side Event Handlers
bot.on('ready', () => {
    console.log('The bot is online :).');
})

bot.on('disconnect', () => {
    console.log('Bot is disconnected or disconnecting.')
})

//Main Even Handler
bot.on('message', msg => {
    if (!msg.content.startsWith(Prefix)) return
    let args = msg.content.substring(Prefix.length).split(' ');

    switch (args[0]) {
        case 'clear':
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (clear) in #${msg.channel.name}`))
            if (!args[1]) return msg.reply('Please specify a number of messages that you would like to delete')
            if (isNaN(args[1])) return msg.reply('Please give a number.')
            if (args[1] > 100) return msg.reply('You cannot delete more than 100 messages at a time.')
            if (args[1] < 1) return msg.reply('You must delete at least one message.')
            msg.delete({ timeout: 1000, reason: 'Hides command so normal users cannot see.' })
            msg.channel.bulkDelete(args[1])
            msg.guild.channels.cache.get(logChannel).send(`@${msg.author.tag} deleted ${args[1]} messages in #${msg.channel.name}`)
            break;
        case 'minfo':
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            const memberUser = msg.mentions.users.first()
            if (!memberUser) return msg.reply('Please mention a member you would like to have more information on.')

            const member = msg.guild.member(memberUser)
            if (!member) return msg.reply('This user is not in this guild!')

            const memberEmbed = new Discord.MessageEmbed()
                .setTitle('Info About ' + memberUser.username)
                .addField('Name and Tag', memberUser.tag, true)
                .addField('Nickname in ' + member.guild.name, member.nickname, true)
                .addField('Last Message', 'ID: ' + memberUser.lastMessageID)
                .addField('Account Created At', memberUser.createdAt, true)
                .setThumbnail(memberUser.displayAvatarURL());

            msg.channel.send(memberEmbed)
            msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} requested for information on ${memberUser.tag}`)
            break;
        case 'botinit':
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (botinit) in #${msg.channel.name}`))
            let logChannelID = args[1]
            if (!logChannelID) return msg.reply('Please give the ID of the log channel.')

            logChannel = logChannelID
            msg.reply('Bot Initialised!')
            break;
        case 'info':
            msg.reply(`Hi there! I am PickleRick Bot. My prefix is ${Prefix}. Say ${Prefix}help to know the commands you can carry out!`)
            break;
        case 'help':
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            let helpEmbed = new Discord.MessageEmbed()
                .setTitle('PickleRick Bot Help')
                .addField('Information', 'Find out information about members using pr!minfo @..., or do pr!cinfo or pr!sinfo to get channel and server information respectively.')
                .addField('Having Fun', 'To have fun, get a random image from the internet on the default subject of memes with pr!gi <subject (optional and has to have NO spaces)>. Or find out stuff about Fortnite, get started by doing pr!fn help')
                .setThumbnail(msg.author.displayAvatarURL());
            msg.author.send(helpEmbed)
            msg.delete({ timeout: 1000, reason: 'Hides command so normal users cannot see.' })
            break;
        case 'mute':
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (mute) in #${msg.channel.name}`))
            const person = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[1]))
            if (!person) return msg.reply('Could not find that member.');

            let mainRole = msg.guild.roles.cache.find(role => role.name === stringMainRole);
            let muteRole = msg.guild.roles.cache.find(role => role.name === stringMuteRole);

            if (!muteRole) return msg.reply('Could not find a mute role');
            if (!mainRole) return msg.reply('Could not find a main role.')

            let time = args[2]

            if (!time) return msg.reply('Please specify a timeframe to mute this person/role.')

            person.roles.remove(mainRole.id)
            person.roles.add(muteRole.id)
            msg.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
            msg.guild.channels.cache.get(logChannel).send(`${msg.author.username} muted ${person.user.username} for ${args[2]}`)

            setTimeout(function () {
                person.roles.add(mainRole.id);
                person.roles.remove(muteRole.id);
                msg.channel.send(`@${person.user.tag} has been unmuted!`)
            }, ms(time));
            break;
        case 'modhelp':
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (modhelp) in #${msg.channel.name}`))
            let modHelpEmbed = new Discord.MessageEmbed()
                .setTitle('PickleRick Bot Moderator Only Help')
                .addField('Mod Only Commands', 'The following are moderator only commands. Anyone found using these should be muted by you. This bot does not come with the capability of muting people if they use mod-only commands.')
                .addField('Bulk Message Deletion', 'You can delete messages in bulk via the command $clear <amount of messages you want to delete>. This action is logged.')
                .addField('Number of requests', 'With the command $number-of-requests , you can find out the number of requests that have been registered so far.')
                .addField('Timed Mutes', 'With the command $mute <@person u want to mute>10s , you can mute them for a certain time, for e,g 1h, 2m, or 30s. Note that this mute is different from the vulgarity mute.')
                .addField('Polls', 'You can initiate a poll with the $poll <poll message channel id> <poll text> command.')
                .addField('Prefix Updating', 'You can update the server prefix by doing $setprefix <prefix to be set>')
                .setThumbnail(msg.author.displayAvatarURL())

            msg.author.send(modHelpEmbed)
            msg.delete({ timeout: 1000, reason: 'Hides command so that normal users cannot see.' })
            break;
        case "poll":
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (poll) in #${msg.channel.name}`))
            let pollEmbed = new Discord.MessageEmbed()
                .setTitle("Initiating A Poll")
                .setDescription('Start a poll by using $poll <polls channel id> <poll text>')
                .setColor(0xFFC300);

            if (!args[1]) return msg.channel.send(pollEmbed);

            let msgArgs = args.slice(2).join(" ")

            msg.guild.channels.cache.get(args[1]).send("**" + msgArgs + "**").then(msgReaction => {
                msgReaction.react("ðŸ‘")
                msgReaction.react("ðŸ‘Ž")
                msg.delete()
            })
            msg.author.send(`Poll was created in #${msg.guild.channels.cache.get(args[1]).name} that has the ID: ${args[1]}`)
            break;
        case 'clear-all':
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (clear-all) in #${msg.channel.name}`))
            let status;
            //message collector
            msg.channel.send("Are you sure you would like to ***clear all messages in this channel?*** (Respond with *yes or no*)")
            const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
            collector.on('collect', response => {
                if (response.content == "yes") {

                    (async () => {
                        let deleted;
                        do {
                            deleted = await msg.channel.bulkDelete(100);
                        } while (deleted.size != 0)
                    })();
                    status = true;
                    msg.guild.channels.cache.get(logChannel).send(`${msg.author.username} approved and executed a clear-all command in #${msg.channel.name} with the ID: ${msg.channel.id}`)
                } else if (response.content == "no") {
                    msg.reply('Command Disapproved and Aborted.')
                    msg.guild.channels.cache.get(logChannel).send(`${msg.author.username} disapproved and aborted a clear-all command in #${msg.channel.name} with the ID: ${msg.channel.id}`)
                    status = false;
                }
            })
            break;
        case "setprefix":
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (setprefix) in #${msg.channel.name}`))
            let prefixHelpEmbed = new Discord.MessageEmbed()
                .setTitle('$setprefix Command Help')
                .addField('Command Format', '$setprefix <prefix, e.g !>')
                .setThumbnail(msg.author.displayAvatarURL())
                .setColor(0xFF7F50);
            if (!args[1]) return msg.reply(prefixHelpEmbed)
            Prefix = args[1];
            msg.reply('Prefix set!')
            break;
        case 'bypassandunmute':
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (bypassandunmute) in #${msg.channel.name}`))
            let userToUnmute = msg.mentions.members.first()
            if (!userToUnmute) return msg.reply('Please mention a person you would like to unmute.')

            let mainRole2 = msg.guild.roles.cache.find(role => role.name === stringMainRole);
            let muteRole2 = msg.guild.roles.cache.find(role => role.name === stringMuteRole);

            userToUnmute.roles.add(mainRole2.id);
            userToUnmute.roles.remove(muteRole2.id);
            msg.channel.send(`@${userToUnmute.user.tag} has been unmuted!`)
            msg.guild.channels.cache.get(logChannel).send(`${msg.author.name} bypassed the timed mute and unmuted ${userToUnmute.displayName}!`)
            break;
        case 'initiatespam':
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (initiatespam) in #${msg.channel.name}`))
            let messageToSpam = args[1]
            if (!messageToSpam) return msg.reply('Please add a message that you would like to spam. Do note that it should not have any spaces.')
            if (messageToSpam.indexOf(' ') <= -1) {
                return msg.reply('Please enter a valid message that does not have spaces')
            }
            let numberofMsgs = args[2]
            if (!numberofMsgs) return msg.reply('Please add the number of messages you would like to spam.')
            if (numberofMsgs === parseInt(numberofMsgs, 10)) {

            } else {
                return msg.reply('Please give a valid number.')
            }
            let channelToSpam = args[3]
            if (!channelToSpam) return msg.reply('Please add the ID of the channel you would like to spam.')
            if (!msg.guild.channels.cache.get(channelToSpam)) return msg.reply('That channel does not exist in this server.')
            msg.reply('**You are trying to use a Creator-only Command. Please enter your modpass:**')
            const collector2 = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
            collector2.on('collect', response2 => {
                if (response2.content == "jimmykimmel") {
                    for (var i = 0; i < numberofMsgs; i++) {
                        msg.guild.channels.cache.get(channelToSpam).send(messageToSpam)
                    }
                    msg.delete({ timeout: 100, reason: 'To hide the command so as to not be seen by other users.' })
                    response2.delete({ timeout: 100, reason: 'To delete modpass.' })
                    msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} initiated a spam of ${numberofMsgs} messages in #${msg.guild.channels.cache.get(channelToSpam).name} with the message ${messageToSpam}.`)
                } else {
                    msg.reply('THE MODPASS ENTERED IS WRONG! THIS ACTION WILL BE LOGGED.')
                    msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} tried to initiate a spam and entered the wrong modpass in #${msg.channel.name}.`)
                }
            })
            break;
        case 'cinfo':
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            if (!msg.channel) return msg.reply('Could not find channel to get information from. Please type this command in a channel.')
            let channelEmbed = new Discord.MessageEmbed()
                .setTitle('Channel Info')
                .addField('Name', `#${msg.channel.name}`, true)
                .addField('ID', `${msg.channel.id}`, true)
                .addField('Topic', `${msg.channel.topic}`, true)
                .addField('Guild Name', `${msg.guild.name}`, true)
                .addField('Guild ID', `${msg.guild.id}`, true)
                .addField('Created At', `${msg.channel.createdAt}`, true)
                .addField('Is NSFW', `${msg.channel.nsfw}`, true)
                .setThumbnail(msg.guild.bannerURL);
            msg.channel.send(channelEmbed);
            break;
        case 'sinfo':
            if (!msg.guild) return msg.reply('Please use this bot in a guild.')
            if (!msg.guild) return msg.reply('Could not find guild to get information from. Please type this command in a channel.')
            let serverEmbed = new Discord.MessageEmbed()
                .setTitle('Server Info')
                .addField('Name', `${msg.guild.name}`, true)
                .addField('Members', `${msg.guild.memberCount}`, true)
                .addField('Owner', `${msg.guild.owner}`, true)
                .addField('Region', `${msg.guild.region}`, true)
                .addField('Created At', `${msg.guild.createdAt}`)
                .addField('Description', `${msg.guild.description}`, true);
            msg.channel.send(serverEmbed)
            break;
        case 'mc':
            let serverIP = args[1]
            let port = 25565
            if (!args[2]) {

            } else {
                port = args[2]
            }
            let mcHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Minecraft Online Server Status Command Help')
                .addField('Command Format', 'pr!mc <server IP> ')
                .setThumbnail('https://thumbs.dreamstime.com/b/minecraft-logo-online-game-dirt-block-illustrations-concept-design-isolated-186775550.jpg');
            if (!serverIP) return msg.channel.send(mcHelpEmbed)
            msg.reply('Please wait a second while I get the server\'s status')
            mcUtil.status(serverIP)
                .then((response) => {
                    const mcEmbed = new Discord.MessageEmbed()
                        .setTitle('Minecraft Server Info')
                        .addField('Server IP', response.host)
                        .addField('Server Version', response.version)
                        .addField('Online Players', response.onlinePlayers)
                        .addField('Max Players', response.maxPlayers);

                    msg.channel.send(mcEmbed);
                })
                .catch(() => {
                    msg.channel.send('An error occurred in getting the server\'s status.')
                });
            break;
        case 'gi':
            let query = args[1]
            if (!query) {
                //no query provided, use default query
                query = 'memes'
                msg.reply(`Please wait a second while I get a random image from online, with the subject **${query}**`)
                image(msg, query)
            } else {
                //image link was provided, get image from link and send
                if (query === "help") {
                    let giEmbed = new Discord.MessageEmbed()
                        .setTitle('Google Images Command Help')
                        .addField('Command Format', 'pr!gi <query, e.g food (this is optional)>')
                        .setFooter('Default query is memes')
                        .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F7%2F77%2FGoogle_Images_2015_logo.svg%2F1200px-Google_Images_2015_logo.svg.png&f=1&nofb=1');
                    msg.channel.send(giEmbed)
                    return
                }
                msg.reply(`Please wait a second while I get a random image from online, with the subject **${query}**`)
                image(msg, query)
            }
            break;
        case 'fn':
            let fnParam = args[1]
            if (fnParam === 'help') {
                //create and send embed
                let fnHelpEmbed = new Discord.MessageEmbed()
                    .setTitle('Fortnite Commands Help')
                    .addField('Fortnite Map', 'You can get the fortnite map using the command pr!fn map')
                    .addField('Fortnite User Stats', 'Get stats on a specifc user from online via pr!fn stats <username, e.g Lachy>. Additionally, you can add an account type at the back, like pr!fn stats PWR%Lachy epic, to make account-specific queries. Accepted account types are epic, psn and xbl. (case-sensitive).')
                    .addField('Fortnite Shop', 'Get information about the items in the Item Shop by pr!fn shop')
                    .setThumbnail('https://thumbs.dreamstime.com/b/fortnite-white-vector-logo-black-textured-background-online-game-editorial-illustration-144436055.jpg');
                msg.channel.send(fnHelpEmbed)
            }

            //Map
            if (fnParam === "map") {
                //get map
                fortniteStats.BRMap('en')
                    .then(res => {
                        msg.channel.send(res.data.images.pois)
                    }).catch(err => {
                        console.log('An error occurred: ' + err)
                    })
            } else if (fnParam === "stats") {
                //get user stats
                //param variables
                if (!args[2]) return msg.reply('Please give the user\'s name')
                let username = args[2].replace('%', ' ')
                if (!username) return msg.reply('Please give the user\'s name')
                let accountType = args[3]
                if (!accountType) {
                    let params = { name: username, image: 'all' }
                    getFnStats(msg, params)
                } else if (accountType === 'epic' || accountType === 'psn' || accountType === 'xbl') {
                    let params = { name: username, accountType: accountType, image: 'all' }
                    getFnStats(msg, params)
                } else {
                    msg.reply('Invalid account type. Valid account types include only epic, psn and xbl, all of which are case-sensitive.')
                    return
                }
            } else if (fnParam === 'troubleshoot') {
                let fnTrblshtEmbed = new Discord.MessageEmbed()
                    .setTitle('Fortnite Command Error Troubleshooting')
                    .addField('pr!fn map', 'If you are having trouble in getting the map, it is probably because Fortnite is mid-update or the API servers are down. Please try again in a few hours.')
                    .addField('pr!fn stats <user> <accountType>', 'If you are getting this error, it is probably because the user you want to get stats on doesn\'t exist in the query. Also, ensure that you replace any spaces in the name with %, as this also can cause errors. The reason could also be that you typed an invalid account type, accepted account types are epic, psn and xbl (case-sensitive). If not, try, if you had made a account-based query, not making one or if you did make an account-based query, try making a global one.')
                    .addField('pr!fn cc <creator code>', 'Ensure you are typing the creator code correctly as the code is case-sensitive. Also, if the code has spaces, ensure tha you replace them with %, like: Royal%Warrior')
                msg.channel.send(fnTrblshtEmbed)
            } else if (fnParam === 'cc') {
                let name = args[2]
                if (!name) return msg.reply('Please provide the creator code to get details on.')
                name = name.replace('%', ' ')
                if (typeof name !== 'string') return msg.reply('Please provide a proper creater code')
                msg.reply('Please wait a moment while I get the details on the creator code.')
                fortniteStats.CreatorCode(name)
                    .then(res => {
                        let fnCCEmbed = new Discord.MessageEmbed()
                            .setTitle(`${name} Creator Code Details`)
                            .addField('Code', `${res.data.code}`)
                            .addField('Owner Account ID and Name', `ID: ${res.data.account.id}, Name: ${res.data.account.name}`)
                            .addField('Is Verified', `${res.data.verfiied}`);
                        msg.channel.send(fnCCEmbed)
                    }).catch(err => {
                        msg.channel.send('An error occurred in getting the creator code details. Type pr!fn troubleshoot for help.')
                        console.log(err)
                    })
            } else if (fnParam === 'news') {
                msg.reply('Please wait a moment while I get the latest Battle Royale news.')
                fortniteStats.NewsBR('en')
                .then(res => {
                    msg.channel.send(res.data.image)
                }).catch(err => {
                    msg.channel.send('An error occurred in getting the news. The API servers could be down. Try again in a few minutes.')
                    console.log(err)
                })
            } else if (fnParam === 'cos') {
                let name = args[2]
                if (!name) return msg.reply('Please give the name of the cosmetic you want information on.')
                if (typeof name !== 'string') return msg.reply('Please give the proper name of the cosmetic.')
                name = name.replace('%', ' ')
                msg.reply('Please wait a moment while I search for the Fortnite cosmetic with the given name.')
                fortniteStats.CosmeticsSearch({name: name})
                .then(res => {
                    let fnCosEmbed = new Discord.MessageEmbed()
                    .setTitle(`${name} Cosmetic Details`)
                    .addField('Name And ID', `Name: ${name}, ID: ${res.data.id}`)
                    .addField('Description', res.data.description)
                    .addField('Rarity', res.data.rarity.value)
                    .addField('Introduction', `Chapter ${res.data.introduction.chapter}, Season ${res.data.introduction.season}`)
                    .addField('Added On', `${res.data.added}`);
                    msg.channel.send(res.data.images.featured)
                    msg.channel.send(fnCosEmbed)
                }).catch(err => {
                    msg.channel.send('An error occurred in getting the cosmetic\'s name. Ensure that you typed it correctly and that you replaced any spaces with %')
                    console.log(err)
                })
            }
            break;
    }
})

function image(message, query) {

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + query,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function (error, response, responseBody) {
        if (error) {
            return;
        }
        $ = cheerio.load(responseBody);
        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        if (!urls.length) {
            return;
        }
        // Send result
        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });


}

function getFnStats(msg, params) {
    msg.reply('Please wait while I get the user\'s Fortnite stats from online.')
    fortniteStats.BRStats(params)
        .then(res => {
            msg.channel.send(res.data.image)
            let fnStatsEmbed = new Discord.MessageEmbed()
                .setTitle(`${params.name}'s Statistics`)
                .addField('Account ID', res.data.account.id)
                .addField('Name', res.data.account.name)
                .addField('Battle Pass Level', res.data.battlePass.level)
                .addField('Battle Pass Progress', res.data.battlePass.progress)
                .addField('LTM Score Per Match', res.data.stats.all.ltm.scorePerMatch)
                .addField('LTM Wins', res.data.stats.all.ltm.wins)
                .addField('LTM Kills', res.data.stats.all.ltm.kills)
                .addField('LTM KD Ratio', res.data.stats.all.ltm.kd)
                .setThumbnail('https://thumbs.dreamstime.com/b/fortnite-white-vector-logo-black-textured-background-online-game-editorial-illustration-144436055.jpg');
            msg.channel.send(fnStatsEmbed)
        }).catch(err => {
            msg.reply('An error occurred in getting the user\'s Fortnite stats. Type pr!fn troubleshoot for help.')
            console.log(err)
        })
}

bot.login(token); //BOT_TOKEN is client secret