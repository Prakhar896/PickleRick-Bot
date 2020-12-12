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
    name: 'clear-all',
    description: 'Clears all messages in a channel',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (clear-all) in #${msg.channel.name}`))
        let status;
        //message collector
        msg.channel.send("Are you sure you would like to ***clear all messages in this channel?*** (Respond with *yes or no*)")
        const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
        collector.on('collect', response => {
            if (response.content == "yes") {

                (async () => {
                    let deleted;
                    do {
                        deleted = await msg.channel.bulkDelete(100);
                    } while (deleted.size != 0)
                })();
                status = true;
                msg.guild.channels.cache.get(logChannel).send(`${msg.author.username} approved and executed a clear-all command in #${msg.channel.name} with the ID: ${msg.channel.id}`)
            } else if (response.content == "no") {
                msg.reply('Command Disapproved and Aborted.')
                msg.guild.channels.cache.get(logChannel).send(`${msg.author.username} disapproved and aborted a clear-all command in #${msg.channel.name} with the ID: ${msg.channel.id}`)
                status = false;
            }
        })
        return
    }
}