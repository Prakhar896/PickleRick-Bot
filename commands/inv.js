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
    name: 'inv',
    description: 'Creates a server invite',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        // if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (initiatespam) in #${msg.channel.name}`))
        if (!msg.member.hasPermission('CREATE_INSTANT_INVITE')) return msg.channel.send('You do not have permissions to create an invite. This action will be logged.').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} attempted to create an invite in #${msg.channel.name} despite not having permissions.`))
        msg.channel.createInvite()
            .then(invite => {
                msg.reply(`Here is an invite: ${invite.url}`)
            })
            .catch(err => {
                msg.reply('An error occurred in creating an invite. Please ensure that I have Create Instant Invite permissions')
                console.log('Invite Creation Error: ' + err)
            })
        return
    }
}