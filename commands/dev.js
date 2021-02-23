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
    execute(msg, args, guildData, Prefix, client, Discord, guilds) {
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
            .addField('Set Activity Command', 'pr!dev setactivity .listening/.watching/.playing/.streaming/.competing <status content>')
            msg.channel.send(devHelpEmbed)
        } else if (devParam == 'announcedowntime' || devParam == 'ad') {
            let msgArgs = args.slice(2).join(" ")
            if (!msgArgs) return msg.reply('Please give the content of the downtime alert.')
            let downtimeEmbed = new Discord.MessageEmbed()
                .setColor('0xFFA500')
                .setTitle('Downtime Alert')
                .addField('Message from Developers:', msgArgs)
                .setFooter('Contact the developers for more information.');
            guilds.forEach(guildData => {
                let guildObject = client.guilds.cache.get(guildData.id)
                let guildLogChannelObject = guildObject.channels.cache.get(guildData.logChannel)
                guildLogChannelObject.send(downtimeEmbed)
            })
            msg.reply('Successfully alerted all servers about downtime, sending a copy of the message here...')
            msg.channel.send(downtimeEmbed)
        } else if (devParam == 'setactivity' || 'sa') {
            if (args[2] != '.listening' && args[2] != '.watching' && args[2] != '.playing' && args[2] != '.streaming' && args[2] != '.competing') return msg.reply('That is not a valid status. Valid statues include: \`.playing, .watching, .listening, .streaming, .competing\`')
            var activityType;
            if (args[2] == '.listening') {
                activityType = 'LISTENING'
            } else if (args[2] == '.watching') {
                activityType = 'WATCHING'
            } else if (args[2] == '.playing') {
                activityType = 'PLAYING'
            } else if (args[2] == '.streaming') {
                activityType = 'STREAMING'
            } else if (args[2] == '.competing') {
                activityType = 'COMPETING'
            }
            let activityContent = args.slice(3).join(" ")
            if (!activityContent) return msg.reply('Please give the content of the status/activity')
            client.user.setActivity(activityContent, { type: activityType })
            .then(presence => {
                msg.reply(`Activity set to ${presence.activities[0].name}`)
                console.log(`A developer set the activity of this bot to ${presence.activities[0].name} in the guild ${msg.guild.name} in the channel ${msg.channel.name}`)
            })
            .catch(err => {
                console.log('Activity setting error: ' + err)
                msg.reply('An error occurred. Failed to set the activity.')
            })
        }
        return
    }
}