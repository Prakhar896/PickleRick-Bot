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
    name: 'destroy',
    description: 'Completely wipes out all channels and roles, can only be run by Owner.',
    execute(msg, args, guildData, Prefix, client, Discord) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        //if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        // if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
        //.then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (//command name) in #${msg.channel.name}`)
        // .catch(err => {
        //     msg.reply(`Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`${Prefix}ss setlogchannel <id of log channel>\` to set the log channel.`)
        // }))
        if (msg.guild.ownerID != msg.author.id) return msg.reply('Sorry, only the Owner of this server can run this command.')
        //actual code
        //check if bot has Administrator permissions
        if (!(msg.guild.me.hasPermission('ADMINISTRATOR'))) return msg.reply('This command can only be run if I have Administrator Permissions.')
        msg.reply('Are you sure you want to delete every channel and role in this server? Respond with **yes or no in 10 seconds**.')
        const yesOrNocollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
        yesOrNocollector.on('collect', response => {
            if (response.content == 'yes') {
                yesOrNocollector.stop()
                msg.reply('Please type the name of this server **exactly** for verification.')
                const nameCheckcollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                nameCheckcollector.on('collect', checkResponse => {
                    nameCheckcollector.stop()
                    if (checkResponse.content === msg.guild.name) {
                        //conduct complete wipeout
                        msg.reply('**Destroying server now...**')
                        msg.guild.channels.cache.forEach(channel => {
                            setTimeout(() => {
                                channel.delete()
                                    .catch(err => {
                                        console.log('Error in Deleting All Channels (Destroy command): ' + err)
                                    })
                            }, 500)
                        })
                        msg.guild.roles.cache.forEach(role => {
                            setTimeout(() => {
                                if (!role.client) {
                                    role.delete()
                                        .catch(err => {
                                            console.log('Error in Deleting All Roles (Destroy command): ' + err)
                                        })
                                }
                            }, 500)
                        })
                        msg.guild.setName('Server Destroyed')
                    } else {
                        msg.reply('Given server name was not the same. Destroy command aborted.')
                        return
                    }
                })
            } else if (response.content == 'no') {
                msg.reply('Destroy Command aborted.')
                return
            } else {
                msg.reply('Invalid response. Destry Command aborted.')
                return
            }
        })
        return
    }
}