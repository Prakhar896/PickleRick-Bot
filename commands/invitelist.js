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
    name: 'invitelist',
    description: 'Fetches all the server\'s invites and displays them.',
    execute(msg, args, guildData, Prefix, client, Discord, guildInvites, creatorBypassMode) {
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        if (msg.author.id == process.env.CREATOR_DISCORD_ID && creatorBypassMode == true) {

        } else {
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
                .then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (invitelist) in #${msg.channel.name}`)
                    .catch(err => {
                        msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                    }))
        }
        let invites = guildInvites.get(msg.guild.id)
        if (!invites) return msg.reply('No invites have been created in this server.')
        let inviteEmbed = new Discord.MessageEmbed()
        .setTitle('Server Invites List');
        invites.forEach(invite => {
            inviteEmbed.addField(invite.url, `Creator: <@${invite.inviter.id}>,\n Code: ${invite.code},\n Expires At: ${invite.expiresAt},\n Created At: ${invite.createdAt},\n Target channel: ${invite.channel},\n Uses: ${invite.uses}`)
        })
        msg.channel.send(inviteEmbed)
        return
    }
}