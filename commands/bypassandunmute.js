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
    name: 'bypassandunmute',
    description: 'This command bypasses the time and unmutes anyone who is muted.',
    execute(msg, args, logChannel) {
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
        return
    }
}