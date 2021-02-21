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
    name: 'dev',
    description: 'Commands reserved for use by developers of this bot',
    execute(msg, args, guildData, Prefix, client, Discord) {
        if (!(msg.author.id == '445816983951507458')) return msg.reply('Sorry, you are not a valid developer of this bot.')
        // admin check
        // if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (initiatespam) in #${msg.channel.name}`))
        let devParam = args[1] 
        if (!devParam) return msg.reply('Please give a parameter that you would like to do!')
        if (devParam == 'restart') {
            msg.reply('Restarting bot!')
            .then(msg => {
                client.destroy()
            })
            .then(() => {
                client.login(process.env.DISCORD_TOKEN)
            })
        } else if (devParam == 'stop') {
            msg.reply('Stopping bot!')
            .then(msg => client.destroy())
        } else if (devParam == 'inv' || devParam == 'link') {
            msg.reply('Generating invite...')
            .then(msg => {
                client.generateInvite({ permissions: ['ADMINISTRATOR'] })
                .then(link => msg.channel.send(`Bot Invite Link Generated: ${link}`))
                .catch(console.error)
            });
        } else if (devParam == 'uptime') {
            let inSeconds = client.uptime / 1000
            msg.reply(`Uptime of this bot: ${inSeconds}s`)
            .catch(console.error)
        } else if (devParam == 'help') {
            let devHelpEmbed = new Discord.MessageEmbed()
            .setTitle('Bot Developer Help Embed')
            .addField('Restart Command', 'pr!dev restart')
            .addField('Stop command', 'pr!dev stop')
            .addField('Invite link command', 'pr!dev inv')
            .addField('Uptime command', 'pr!dev uptime')
            msg.channel.send(devHelpEmbed)
        }
        return
    }
}