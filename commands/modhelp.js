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
    name: 'modhelp',
    description: 'Sends moderation commands to a moderator.',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (modhelp) in #${msg.channel.name}`))
        let modHelpEmbed = new Discord.MessageEmbed()
            .setTitle('PickleRick Bot Moderator Only Help')
            .addField('Mod Only Commands', 'The following are moderator only commands. Anyone found using these should be muted by you. This bot does not come with the capability of muting people if they use mod-only commands.')
            .addField('Bulk Message Deletion', 'You can delete messages in bulk via the command pr!clear <amount of messages you want to delete>. This action is logged.')
            .addField('Timed Mutes', 'With the command pr!mute <@person u want to mute>10s , you can mute them for a certain time, for e,g 1h, 2m, or 30s.')
            .addField('Polls', 'You can initiate a poll with the pr!poll <poll message channel id> <poll text> command.')
            .addField('Prefix Updating', 'You can update the server prefix by doing pr!setprefix <prefix to be set>')
            .setThumbnail(msg.author.displayAvatarURL())

        msg.author.send(modHelpEmbed)
        msg.delete({ timeout: 1000, reason: 'Hides command so that normal users cannot see.' })
        return
    }
}