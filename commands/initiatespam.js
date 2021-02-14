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
    name: 'initiatespam',
    description: 'Initiates a message spam of the given number of messages in a channel',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
        .then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (initiatespam) in #${msg.channel.name}`)
        .catch(err => {
            msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
        }))
        let messageToSpam = args[1].split("%").join(" ");
        if (!messageToSpam) return msg.reply('Please add a message that you would like to spam. Do note that any spaces should be replaced with a % sign.')
        console.log(messageToSpam)
        let numberofMsgs = args[2]
        if (!numberofMsgs) return msg.reply('Please add the number of messages you would like to spam.')
        if (numberofMsgs == parseInt(numberofMsgs, 10)) {

        } else {
            return msg.reply('Please give a valid number.')
        }
        let channelToSpam = args[3]
        console.log(channelToSpam)
        if (!channelToSpam) return msg.reply('Please add the ID of the channel you would like to spam.')
        if (!msg.guild.channels.cache.get(channelToSpam)) return msg.reply('That channel does not exist in this server.')
        for (var i = 0; i < numberofMsgs; i++) {
            msg.guild.channels.cache.get(channelToSpam).send(messageToSpam)
            .catch(err => {
                msg.reply('Failed to spam the message: \`' + messageToSpam + '\`, please try again!')
            })
        }

        msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} initiated a spam of ${numberofMsgs} messages in <#${msg.guild.channels.cache.get(channelToSpam).id}> with the message ${messageToSpam}.`)
        .catch(err => {
            msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
        })

        msg.delete({ timeout: 100, reason: 'To hide the command so as to not be seen by other users.' })
        .catch(err => {
            msg.reply('Failed to delete the spam initiation message.')
        })
        return
    }
}