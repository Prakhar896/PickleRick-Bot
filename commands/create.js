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
        if (createParam == 'tc') {
            let mode = args[2]
            if (!mode) return msg.reply(`Please give a channel creation mode type. Valid mode types include \'basic\' and \'advanced\' (has more customisation). Type \`${Prefix}create help\` for more information.`)
            if (mode != 'basic' && mode != 'advanced') return msg.reply(`Invalid channel creation mode type. Valid mode types include \'basic\' and \'advanced\' (has more customisation). Type \`${Prefix}create help\` for more information.`)
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
            }
        }
        return
    }
}