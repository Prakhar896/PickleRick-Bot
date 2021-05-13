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
                .addField('Set Activity Command', 'pr!dev setactivity/sa .listening/.watching/.playing/.streaming/.competing <status content>')
                .addField('Get bot status', 'pr!dev status')
                .addField('Set the bot\'s username', 'pr!dev setusername/su <new username>')
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
        } else if (devParam == 'setactivity' || devParam == 'sa') {
            if (args[2] != '.listening' && args[2] != '.watching' && args[2] != '.playing' && args[2] != '.streaming' && args[2] != '.competing') return msg.reply('That is not a valid status. Valid statuses include: \`.playing, .watching, .listening, .streaming, .competing\`')
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
                    msg.reply('An error occurred. Failed to set the activity. ')
                })
        } else if (devParam == 'status') {
            let guildCount = client.guilds.cache.size
            let activity = client.user.presence.activities[0].name
            let uptime = client.uptime / 1000
            let username = client.user.username
            let statusDevEmbed = new Discord.MessageEmbed()
                .setTitle('PickleRick Bot Status')
                .addField('Guild Count', `In ${guildCount} guilds`)
                .addField('Current Status/Activity', `${activity}`)
                .addField('Uptime', `${uptime} seconds`)
                .addField('Current Username', `${username}`)
                .setThumbnail('https://github.com/Prakhar896/PickleRick-Bot/blob/main/picklerickboticon.png?raw=true')
                .setColor('GREEN')
                .setFooter(`Requested by ${msg.author.tag} in #${msg.channel.name}`);
            msg.channel.send(statusDevEmbed)
                .catch(err => {
                    console.log('Error in Sending Status Embed: ' + err)
                    msg.reply('An error occurred in sending the status embed.')
                })
        } else if (devParam == 'setusername' || devParam == 'su') {
            let newUsername = args.slice(2).join(" ")
            if (!newUsername) return msg.reply('Please give the new username of this bot.')
            client.user.setUsername(newUsername)
                .then(() => {
                    msg.reply(`Changed bot username to \`${newUsername}\` successfully.`)
                })
                .catch(err => {
                    console.log('Username Changing Error: ' + err)
                    msg.reply('An error occurred in changing this bot\'s username.')
                    msg.reply('Error log: ' + err)
                })
        } else if (devParam == 'getalldata') {
            guilds.forEach(guildData => {
                let dataEmbed = new Discord.MessageEmbed()
                .setTitle(guildData.name)
                .setColor('RANDOM');
                if (guildData.id) dataEmbed.addField('ID', guildData.id)
                if (guildData.logChannel) dataEmbed.addField('Log Channel', guildData.logChannel)
                if (guildData.mainRole) dataEmbed.addField('Main Role', guildData.mainRole)
                if (guildData.muteRole) dataEmbed.addField('Mute Role', guildData.muteRole)
                if (String(guildData.allowsDeleting)) dataEmbed.addField('Allows Deleting', String(guildData.allowsDeleting))
                if (String(guildData.autorolesEnabled)) dataEmbed.addField('AutoRoles Enabled', String(guildData.autorolesEnabled));
                msg.channel.send(dataEmbed)
            })
        } else if (devParam == 'announce' || devParam == 'an') {
            let msgArgs = args.slice(2).join(" ")
            if (!msgArgs) return msg.reply('Please give the content of the announcement.')
            let downtimeEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Announcement from Developers')
                .addField('Message:', msgArgs)
                .setFooter('Contact the developers for more information.');
            guilds.forEach(guildData => {
                let guildObject = client.guilds.cache.get(guildData.id)
                let guildLogChannelObject = guildObject.channels.cache.get(guildData.logChannel)
                guildLogChannelObject.send(downtimeEmbed)
            })
            msg.reply('Successfully sent announcement to all servers, sending a copy of the message here...')
            msg.channel.send(downtimeEmbed)
        }
        return
    }
}
