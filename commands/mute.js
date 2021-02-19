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
    name: 'mute',
    description: 'Gives the mute role to a user for a certain amount of time.',
    execute(msg, args, guildData, Prefix, client, Discord) {
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
        .then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (mute) in #${msg.channel.name}`)
        .catch(err => {
            msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
        }))
        const person = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[1]))
        if (!person) return msg.reply('Could not find that member.')
        if (msg.guild.me.hasPermission('MANAGE_ROLES')) {
            
        } else {
            msg.reply('Please give this bot Manage Roles permissions to mute someone.')
            return
        }

        let mainRole = msg.guild.roles.cache.find(role => role.name === guildData.mainRole);
        let muteRole = msg.guild.roles.cache.find(role => role.name === guildData.muteRole);

        if (!muteRole) return msg.reply('Could not find a mute role');
        if (!mainRole) return msg.reply('Could not find a main role.')

        let time = args[2]

        if (!time) return msg.reply('Please specify a timeframe to mute this person/role.')

        person.roles.remove(mainRole.id)
        person.roles.add(muteRole.id)
        msg.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
        msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.username} muted ${person.user.username} for ${args[2]}`)
        .catch(err => {
            msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
        })

        setTimeout(function () {
            person.roles.add(mainRole.id)
            person.roles.remove(muteRole.id)
            msg.channel.send(`@${person.user.tag} has been unmuted!`)
        }, ms(time));
        return
    }
}