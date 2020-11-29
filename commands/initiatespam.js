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
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (initiatespam) in #${msg.channel.name}`))
        let messageToSpam = args[1]
        if (!messageToSpam) return msg.reply('Please add a message that you would like to spam. Do note that it should not have any spaces.')
        console.log(messageToSpam)
        if (messageToSpam.indexOf(' ') >= 0) {
            return msg.reply('Please enter a valid message that does not have spaces')
        }
        let numberofMsgs = args[2]
        if (!numberofMsgs) return msg.reply('Please add the number of messages you would like to spam.')
        console.log(parseInt(numberofMsgs, 10))
        if (numberofMsgs == parseInt(numberofMsgs, 10)) {

        } else {
            return msg.reply('Please give a valid number.')
        }
        let channelToSpam = args[3]
        if (!channelToSpam) return msg.reply('Please add the ID of the channel you would like to spam.')
        if (!msg.guild.channels.cache.get(channelToSpam)) return msg.reply('That channel does not exist in this server.')
        msg.reply('**You are trying to use a Moderator-only Command. Please enter your modpass:**')
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
        return
    }
}