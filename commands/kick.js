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
    name: 'kick',
    description: 'Kicks a user from the server.',
    execute(msg, args, logChannel) {
        const kickMember = msg.mentions.users.first();
        if (!kickMember) return msg.reply('Please mention a member that you would like to kick!')
        if (!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply('You do not have authorization to use this command. To use this command you must have the Kick Members permission. This action will be logged!')
        .then(() => { 
            msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} attempted to kick ${kickMember.tag} in #${msg.channel.name} although the user does not have permissions!`)
            .catch(err => {
                msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
            }) 
        })
        const memberWithinServer = msg.guild.members.cache.get(kickMember.id)
        if (!memberWithinServer.bannable) return msg.reply('This user cannot be kicked. Ensure that the user does not have Administrator permissions.')
        memberWithinServer.kick(`${msg.author.tag} used the kick command in #${msg.channel.name}`)
            .then(() => {
                msg.channel.send(`${memberWithinServer.user.tag} was kicked!`)
                msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} kicked ${memberWithinServer.user.tag} in #${msg.channel.name}!`)
            })
            .catch(err => {
                msg.reply('An error occurred in kicking the member. Please ensure that you have given this bot Administrator and Kick Members permissions.')
                console.log('Kicking Error: ' + err)
            })
        return
    }
}