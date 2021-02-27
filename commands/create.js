//these libraries may or may not be used in the command
const Discord = require('discord.js');
const ms = require("ms");
const http = require('https');
const mcUtil = require('minecraft-server-util');
const cheerio = require('cheerio');
const request = require('request');
const fortniteAPI = require('fortnite-api-com');
const triviaDB = require('triviadb')
const fs = require('fs')

module.exports = {
    name: 'create',
    description: 'Allows mods to create Text and Voice Channels easily.',
    async execute(msg, args, guildData, Prefix, client, Discord) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
            .then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (create) in #${msg.channel.name}`)
                .catch(err => {
                    msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                }))

        //actual code
        let createParam = args[1]
        if (!createParam) return msg.reply('Please give the type of channel you would like to create. Valid types include \'tc\' (Text Channel) and \'vc\' (Voice Channel)\`')
        if (createParam != 'tc' && createParam != 'vc' && createParam != 'help') return msg.reply('Incorrect channel type. Valid types include \'tc\' (Text Channel) and \'vc\' (Voice Channel)\`')
        if (createParam == 'help') {
            let helpEmbed = new Discord.MessageEmbed()
            .setTitle('Create Command Help')
            .setColor('PURPLE');
            //TO DO
        }
        if (createParam == 'tc') {
            let mode = args[2]
            if (!mode) return msg.reply(`Please give a channel creation mode type. Valid mode types include \'basic\' and \'advanced\' (has more customisation). Type \`${Prefix}create help\` for more information.`)
            if (mode != 'basic' && mode != 'advanced' && mode != 'adv') return msg.reply(`Invalid channel creation mode type. Valid mode types include \'basic\' and \'advanced\' (has more customisation). Type \`${Prefix}create help\` for more information.`)
            if (mode == 'basic') {
                let channelName = args[3]
                if (!channelName) return msg.reply('Please give the name of the channel, with spaces replaced with \'%\' or \'-\'')
                channelName = channelName.split('%').join(' ')
                channelName = channelName.split('-').join(' ')
                let topic = args.slice(4).join(' ')
                if (!topic) topic = 'This is a public channel created by PickleRick.'
                await msg.guild.channels.create(channelName, { type: 'text', topic: topic, reason: `${msg.author.tag} created this channel in ${msg.channel.name}` })
                    .then(() => {
                        msg.reply(`Successfully created channel #${channelName}.`)
                        msg.guild.channels.cache.get(guildData.logChannel).send(`<@${msg.author.id}> created the channel #${channelName} in <#${msg.channel.id}> with the topic \`${topic}\``)
                        return
                    })
                    .catch(err => {
                        msg.reply('An error occurred in creating the channel. Please ensure that I have Admin permissions.')
                        console.log('Channel Creation Error: ' + err)
                        return
                    })
            } else if (mode == 'adv' || mode == 'advanced') {
                msg.reply('Advanced mode, please respond to the next few messages that guide you to customising the new channel under 30 seconds.')
                msg.reply('Alright, let\'s start. First, give me the channel name. (you do not need to replace spaces with anything, e.g vip general)')
                const nameCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
                nameCollector.on('collect', nameResponse => {
                    let channelName = String(nameResponse.content)
                    channelName = channelName.split('%').join('-')
                    channelName = channelName.split(' ').join('-')
                    nameCollector.stop()
                    const channelType = 'text'
                    msg.reply(`Alright I have got the name ${channelName}. Now give me a topic. Type \'none\' if you dont want a topic.`)
                    let topicCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
                    topicCollector.on('collect', topicResponse => {
                        let topic = String(topicResponse.content)
                        if (topic.toLowerCase() == 'none') topic = 'This channel was created by PickleRick.'
                        topicCollector.stop()
                        msg.reply(`Alright, the topic is \`${topic}\``)
                        msg.reply('Now tell me whether this channel should be NSFW or not. Say \'yes\' and \'true\' or \'no\' or \'false\'')
                        let nsfwCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
                        nsfwCollector.on('collect', nsfwResponse => {
                            const nsfwResAsString = String(nsfwResponse.content)
                            var isNsfw;
                            if (nsfwResAsString.toLowerCase() == 'no' || nsfwResAsString.toLowerCase() == 'false') isNsfw = false
                            if (nsfwResAsString.toLowerCase() == 'yes' || nsfwResAsString.toLowerCase() == 'true') isNsfw = true
                            if (isNsfw == undefined) {
                                msg.reply('Invalid option given. Channel creation aborted. Please redo the command to create the channel again.')
                                nsfwCollector.stop()
                                return
                            }
                            nsfwCollector.stop()
                            if (!guildData.mainRole) {
                                msg.reply('Creating channel with given options...')
                                msg.guild.channels.create(channelName, { type: channelType, topic: topic, nsfw: isNsfw, reason: `${msg.author.tag} created this channel in #${msg.channel.name}.` })
                                    .catch(err => {
                                        msg.reply('An error occurred in creating the channel. Please ensure that I have Admin permissions.')
                                        console.log('Channel Creation Error (Advanced mode): ' + err)
                                        return
                                    })
                                msg.reply('Channel successfully created!')
                                let logChannel = msg.guild.channels.cache.get(guildData.logChannel)
                                if (!logChannel) {
                                    msg.reply(`An error occurred in logging the channel creation event to the log channel. Please ensure that you have set a log channel using \`${Prefix}ss setlogchannel <id of log channel>\``)
                                    return
                                }
                                logChannel.send(`<@${msg.author.id}> created the channel #${channelName} in <#${msg.channel.id}> with the following options, NSFW: ${isNsfw}, Topic: \`${topic}\`.`)
                                    .catch(err => {
                                        msg.reply(`An error occurred in logging the channel creation event to the log channel. Please ensure that you have set a log channel using \`${Prefix}ss setlogchannel <id of log channel>\``)
                                        console.log('Channel Creation Error (Failed to log event to log channel): ' + err)
                                        console.log('Error corresponding guild data: ' + guildData)
                                        return
                                    })
                                return
                            } else {
                                // option with allow members to see/text channel
                                msg.reply(`I have detected that you have the main role \'${guildData.mainRole}\'. You can make this channel either public (Members with the main role can see and message.), view only (Members with main role can only see messages, good for annoucement channels.), or private (Members with main role cannot see this channel entirely.). Response with public, view only or private.`)
                                let permCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
                                permCollector.on('collect', permResponse => {
                                    let permission = String(permResponse.content).toLowerCase()
                                    permCollector.stop()
                                    if (permission != 'public' && permission != 'view only' && permission != 'private') return msg.reply('Invalid option given. Channel creation aborted. Please redo the command to create the channel again.')
                                    let objectMainRole = msg.guild.roles.cache.find(r => r.name === guildData.mainRole)
                                    if (!objectMainRole) {
                                        msg.reply(`There has been a misunderstanding...I could not find the role in this server with the name \`${guildData.mainRole}\`. Please set the main role again using \`${Prefix}ss setmainrole <main role name>\`.`)
                                        msg.reply('Channel creation aborted. Please redo the command to create the channel again.')
                                        return
                                    }
                                    if (permission == 'public') {
                                        permission = ['VIEW_CHANNEL', 'SEND_MESSAGES']
                                        //allow all
                                        msg.guild.channels.create(channelName,
                                            {
                                                type: channelType,
                                                topic: topic,
                                                nsfw: isNsfw,
                                                reason: `${msg.author.tag} created this channel in #${msg.channel.name}.`,
                                                permissionOverwrites: [{
                                                    id: objectMainRole.id,
                                                    allow: permission
                                                }]
                                            })
                                            .catch(err => {
                                                msg.reply('An error occurred in creating the channel. Please ensure that I have Admin permissions.')
                                                console.log('Channel Creation Error (Advanced mode): ' + err)
                                                return
                                            })
                                        msg.reply('Channel successfully created!')
                                        let logChannel = msg.guild.channels.cache.get(guildData.logChannel)
                                        if (!logChannel) {
                                            msg.reply(`An error occurred in logging the channel creation event to the log channel. Please ensure that you have set a log channel using \`${Prefix}ss setlogchannel <id of log channel>\``)
                                            return
                                        }
                                        logChannel.send(`<@${msg.author.id}> created the channel #${channelName} in <#${msg.channel.id}> with the following options, NSFW: ${isNsfw}, Topic: \`${topic}\`, Permissions: Members with ${guildData.mainRole} can SEND and VIEW.`)
                                            .catch(err => {
                                                msg.reply(`An error occurred in logging the channel creation event to the log channel. Please ensure that you have set a log channel using \`${Prefix}ss setlogchannel <id of log channel>\``)
                                                console.log('Channel Creation Error (Failed to log event to log channel): ' + err)
                                                console.log('Error corresponding guild data: ' + guildData)
                                                return
                                            })
                                        return
                                    } else if (permission == 'view only') {
                                        permission = ['SEND_MESSAGES']
                                        const permissionsAllowed = ['VIEW_CHANNEL']
                                        //deny send messages
                                        msg.guild.channels.create(channelName,
                                            {
                                                type: channelType,
                                                topic: topic,
                                                nsfw: isNsfw,
                                                reason: `${msg.author.tag} created this channel in #${msg.channel.name}.`,
                                                permissionOverwrites: [{
                                                    id: objectMainRole.id,
                                                    deny: permission,
                                                    allow: permissionsAllowed
                                                }]
                                            })
                                            .catch(err => {
                                                msg.reply('An error occurred in creating the channel. Please ensure that I have Admin permissions.')
                                                console.log('Channel Creation Error (Advanced mode): ' + err)
                                                return
                                            })
                                        msg.reply('Channel successfully created!')
                                        let logChannel = msg.guild.channels.cache.get(guildData.logChannel)
                                        if (!logChannel) {
                                            msg.reply(`An error occurred in logging the channel creation event to the log channel. Please ensure that you have set a log channel using \`${Prefix}ss setlogchannel <id of log channel>\``)
                                            return
                                        }
                                        logChannel.send(`<@${msg.author.id}> created the channel #${channelName} in <#${msg.channel.id}> with the following options, NSFW: ${isNsfw}, Topic: \`${topic}\`, Permissions: Members with ${guildData.mainRole} cannot SEND but can VIEW.`)
                                            .catch(err => {
                                                msg.reply(`An error occurred in logging the channel creation event to the log channel. Please ensure that you have set a log channel using \`${Prefix}ss setlogchannel <id of log channel>\``)
                                                console.log('Channel Creation Error (Failed to log event to log channel): ' + err)
                                                console.log('Error corresponding guild data: ' + guildData)
                                                return
                                            })
                                        return
                                    } else if (permission == 'private') {
                                        permission = ['VIEW_CHANNEL']
                                        //deny view channel
                                        msg.guild.channels.create(channelName,
                                            {
                                                type: channelType,
                                                topic: topic,
                                                nsfw: isNsfw,
                                                reason: `${msg.author.tag} created this channel in #${msg.channel.name}.`,
                                                permissionOverwrites: [{
                                                    id: objectMainRole.id,
                                                    deny: permission
                                                }]
                                            })
                                            .catch(err => {
                                                msg.reply('An error occurred in creating the channel. Please ensure that I have Admin permissions.')
                                                console.log('Channel Creation Error (Advanced mode): ' + err)
                                                return
                                            })
                                        msg.reply('Channel successfully created!')
                                        let logChannel = msg.guild.channels.cache.get(guildData.logChannel)
                                        if (!logChannel) {
                                            msg.reply(`An error occurred in logging the channel creation event to the log channel. Please ensure that you have set a log channel using \`${Prefix}ss setlogchannel <id of log channel>\``)
                                            return
                                        }
                                        logChannel.send(`<@${msg.author.id}> created the channel #${channelName} in <#${msg.channel.id}> with the following options, NSFW: ${isNsfw}, Topic: \`${topic}\`, Permissions: Members with ${guildData.mainRole} cannot VIEW.`)
                                            .catch(err => {
                                                msg.reply(`An error occurred in logging the channel creation event to the log channel. Please ensure that you have set a log channel using \`${Prefix}ss setlogchannel <id of log channel>\``)
                                                console.log('Channel Creation Error (Failed to log event to log channel): ' + err)
                                                console.log('Error corresponding guild data: ' + guildData)
                                                return
                                            })
                                        return
                                    }
                                })
                                return
                            }
                        })
                    })
                })
            }
        } else if (createParam == 'vc') {
            let mode = args[2]
            if (mode != 'basic' && mode != 'adv' && mode != 'advanced') return msg.reply(`Please give a channel creation mode type. Valid mode types include \'basic\' and \'advanced/adv\' (has more customisation). Type \`${Prefix}create help\` for more information.`)
            if (mode == 'basic') {
                let channelName = args[3]
                if (!channelName) return msg.reply('Please give the name of the new voice channel, the spaces do not need to be replaced with anything. (Voice channels do not need to have the \'-\' sign in between spaces.')
                msg.guild.channels.create(channelName, { type: 'voice', reason: `${msg.author.tag} created this voice channel in #${msg.channel.name}` })
                .catch(err => {
                    msg.reply('An error occurred in creating the voice channel. Please ensure that I have Admin permissions.')
                    console.log('Channel Creation Error: (Voice Channel Basic Mode: ' + err)
                    return
                })
                msg.reply('Channel successfully created!')
                return
            }
        }
        return
    }
} 