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
    execute(msg, args, guildData, Prefix, client, Discord, creatorBypassMode) {
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (msg.author.id == process.env.CREATOR_DISCORD_ID && creatorBypassMode == true) {

        } else {
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
                .then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (clear-all) in #${msg.channel.name}`)
                    .catch(err => {
                        msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                    }))
        }
        let status;
        //message collector
        msg.channel.send("Are you sure you would like to ***clear all messages in this channel?*** (Respond with *yes or no*)")
        const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
        collector.on('collect', response => {
            if (response.content == "yes") {

                (async () => {
                    let deleted;
                    do {
                        try {
                            deleted = await msg.channel.bulkDelete(100);
                        } catch {
                            msg.reply('Failed to delete all messages in this channel. This is likely due to the messages being older than 14 days. I cannot delete messages older than 14 days.')
                            console.log('Clear-all Error Occurred')
                            return
                        }
                    } while (deleted.size != 0)
                })();
                status = true;
                msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.username} approved and executed a clear-all command in #${msg.channel.name} with the ID: ${msg.channel.id}`)
                .catch(err => {
                    msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                })
            } else if (response.content == "no") {
                msg.reply('Command Disapproved and Aborted.')
                msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.username} disapproved and aborted a clear-all command in #${msg.channel.name} with the ID: ${msg.channel.id}`)
                .catch(err => {
                    msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                })
                status = false;
            }
        })
        return
    }
}