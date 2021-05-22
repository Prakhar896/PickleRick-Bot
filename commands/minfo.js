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
    name: 'minfo',
    description: 'Gets information about a member and displays it.',
    execute(msg, args, guildData, Prefix, client, Discord) {
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        const memberUser = msg.mentions.users.first()
        if (!memberUser) return msg.reply('Please mention a member you would like to have more information on.')

        const member = msg.guild.member(memberUser)
        if (!member) return msg.reply('This user is not in this guild!')

        const memberEmbed = new Discord.MessageEmbed()
            .setTitle('Info About ' + memberUser.username)
            .addField('Name and Tag', memberUser.tag, true)
            .addField('Nickname in ' + member.guild.name, member.nickname, true);

        var roleString = ""
        var roles = member.roles.cache.forEach(role => {
            if (role.name != '@everyone') {
                roleString = roleString + ` <@&${role.id}>`
            }
        })
        memberEmbed.addField('Roles: ', roleString)
        memberEmbed.addField('User', 'ID: ' + memberUser.id)
            .addField('Account Created At', memberUser.createdAt, true)
            .setThumbnail(memberUser.displayAvatarURL())
            .setColor('RANDOM');

        msg.channel.send(memberEmbed)
        msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} requested for information on ${memberUser.tag}`)
            .catch(err => {
                msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
            })
    }
}