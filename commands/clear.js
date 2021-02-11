//these libraries may or may not be used in the command
const ms = require("ms");
const http = require('https');
const mcUtil = require('minecraft-server-util');
const cheerio = require('cheerio');
const request = require('request');
const fortniteAPI = require('fortnite-api-com');
const triviaDB = require('triviadb')
const fs = require('fs')

module.exports = {
    name: 'clear',
    description: 'Clears a certain number of messages in the channel.',
    execute(msg, args, logChannel) {
        console.log(logChannel)
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (clear) in #${msg.channel.name}`))
        if (!args[1]) return msg.reply('Please specify a number of messages that you would like to delete')
        if (isNaN(args[1])) return msg.reply('Please give a number.')
        if (args[1] > 100) return msg.reply('You cannot delete more than 100 messages at a time.')
        if (args[1] < 1) return msg.reply('You must delete at least one message.')
        msg.channel.bulkDelete(args[1])
        .catch(err => {
            msg.channel.send('An error occurred in deleting the requested messages.')
            console.log('Clear Message Error: ' + err)
        })
        msg.guild.channels.cache.get(logChannel).send(`@${msg.author.tag} deleted ${args[1]} messages in #${msg.channel.name}`)
    }
}
