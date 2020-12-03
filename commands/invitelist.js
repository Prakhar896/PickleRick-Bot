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
    execute(msg, args, logChannel, guildInvites) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (sinvites) in #${msg.channel.name}`))
        let invites = guildInvites.get(msg.guild.id)
        if (!invites) return msg.reply('No invites have been created in this server.')
        let inviteEmbed = new Discord.MessageEmbed()
        .setTitle('Server Invites List');
        invites.forEach(invite => {
            inviteEmbed.addField(invite.url, `Creator: <@${invite.inviter.id}>,\n Code: ${invite.code},\n Expires At: ${invite.expiresAt},\n Created At: ${invite.createdAt},\n Uses: ${invite.uses}`)
        })
        msg.channel.send(inviteEmbed)
        return
    }
}