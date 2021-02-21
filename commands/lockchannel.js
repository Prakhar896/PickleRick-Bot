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
    name: 'lockchannel',
    description: 'Locks a channel from being messaged in by normal members.',
    execute(msg, args, guildData, Prefix, client, Discord) {
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
        .then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (lockchannel) in #${msg.channel.name}`)
        .catch(err => {
            msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
        }))
        let lockCParam = args[1]
        if (!lockCParam && lockCParam != "unlock") {
            let mainRole = msg.guild.roles.cache.find(role => role.name === guildData.mainRole)
            if (!mainRole) return msg.reply('Please set-up the main role of this server in this bot using the pr!ss setmainrole <main role name> command.')
            msg.channel.updateOverwrite(mainRole, { SEND_MESSAGES: false }, `${msg.author.tag} requested to lock #${msg.channel.name} to prevent people from sending messages.`)
            .catch(err => {
                msg.reply('Unable to lock this channel. Please ensrue that I have Administrator permissions and that my role is highest in the role hierarchy and that you have set the main role of this server in pr!ss current.')
                console.log('Lock Channel Error: ' + err)
            })
            msg.reply('Channel has been locked successfully. Normal members now cannot message in this channel.')
            msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} locked <#${msg.channel.id}>. Normal members now cannot send messages in <#${msg.channel.id}>.`)
        } else {
            let mainRole = msg.guild.roles.cache.find(role => role.name === guildData.mainRole)
            if (!mainRole) return msg.reply('Please set-up the main role of this server in this bot using the pr!ss setmainrole <main role name> command.')
            msg.channel.updateOverwrite(mainRole, { SEND_MESSAGES: true }, `${msg.author.tag} requested to unlock #${msg.channel.name} to prevent people from sending messages.`)
            .catch(err => {
                msg.reply('Unable to unlock this channel. Please ensrue that I have Administrator permissions and that my role is highest in the role hierarchy and that you have set the main role of this server in pr!ss current.')
                console.log('Unlock Channel Error: ' + err)
            })
            msg.reply('Channel has been unlocked successfully. Normal members now can message in this channel.')
            msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} unlocked <#${msg.channel.id}>. Normal members now can send messages in <#${msg.channel.id}>.`)
        }
        return
    }
}