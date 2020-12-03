//these libraries may or may not be used in the command
const Discord = require('discord.js');
const ms = require("ms");
const http = require('https');
const mcUtil = require('minecraft-server-util');
const cheerio = require('cheerio');
const request = require('request');
const fortniteAPI = require('fortnite-api-com');
const triviaDB = require('triviadb')
const fs = require('fs');
const { error } = require('console');

module.exports = {
    name: 'Unban',
    description: 'Unbans a banned user',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (unban) in #${msg.channel.name}`))
        let userID = args[1]
        if (!userID) return msg.reply('Please give the user\'s ID whom you would like to unban.')
        if (isNaN(userID)) return msg.reply('Please give a proper User ID.')
        msg.guild.members.unban(userID, `${msg.author.name} unbanned the user in #${msg.channel.name}`)
        .then(user => {
            msg.channel.send(`Unbanned ${user.username} successfully!`)
            return
        })
        .catch(err => {
            msg.channel.send('An error occurred in unbanning the user.')
            console.log('Unbanning Error: ' + err)
        })
        return
    }
}