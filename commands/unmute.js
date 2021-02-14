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
    name: 'unmute',
    description: 'This command bypasses the time and unmutes anyone who is muted.',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
        .then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (bypassandunmute) in #${msg.channel.name}`)
        .catch(err => {
            msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
        }))
        let userToUnmute = msg.mentions.members.first()
        if (!userToUnmute) return msg.reply('Please mention a person you would like to unmute.')

        let mainRole2 = msg.guild.roles.cache.find(role => role.name === 'normie');
        let muteRole2 = msg.guild.roles.cache.find(role => role.name === 'dood is shut');

        userToUnmute.roles.add(mainRole2.id);
        userToUnmute.roles.remove(muteRole2.id);
        msg.channel.send(`@${userToUnmute.user.tag} has been unmuted!`)
        msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} bypassed the timed mute and unmuted ${userToUnmute.displayName}!`)
        return
    }
}