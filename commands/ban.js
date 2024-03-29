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
    name: 'ban',
    description: 'Bans a user from the server such that he/she cannot join again.',
    execute(msg, args, guildData, Prefix, client, Discord, creatorBypassMode) {
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        const banMember = msg.mentions.users.first();
        if (!banMember) return msg.reply('Please mention a member that you would like to ban!')
        if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('You do not have authorization to use this command. To use this command you must have the Kick Members permission. This action will be logged!')
        .then(() => { 
            msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} attempted to ban ${banMember.tag} in #${msg.channel.name} although the user does not have permissions!`)
        })
        .catch(err => {
            msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
        })
        const memberWithinServerBan = msg.guild.members.cache.get(banMember.id)
        if (!memberWithinServerBan.bannable) return msg.reply('This user cannot be banned. Ensure that the user does not have Administrator permissions.')
        memberWithinServerBan.ban()
            .then(() => {
                msg.channel.send(`**The ban hammer has spoken!** ${memberWithinServerBan.user.tag} was banned!`)
                msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} banned ${memberWithinServerBan.user.tag} in #${msg.channel.name}!`)
                .catch(err => {
                    msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                })
                msg.channel.send(`If you do wish to unban this user at a later date, you will require his/her ID. The ID of this user is: ` + memberWithinServerBan.user.id)
            })
            .catch(err => {
                msg.reply('An error occurred in banning the member. Please ensure that you have given this bot Administrator and Ban Members permissions.')
                console.log('Ban Error: ' + err)
            })
        return
    }
}