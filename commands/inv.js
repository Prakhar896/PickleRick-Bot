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
        let invParam = args[1]
        if (!invParam) {
            if (!msg.member.hasPermission('CREATE_INSTANT_INVITE')) return msg.channel.send('You do not have permissions to create an invite. This action will be logged.').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} attempted to create an invite in #${msg.channel.name} despite not having permissions.`))
            msg.channel.createInvite()
                .then(invite => {
                    msg.reply(`Here is an invite: ${invite.url}`)
                })
                .catch(err => {
                    msg.reply('An error occurred in creating an invite. Please ensure that I have Create Instant Invite permissions')
                    console.log('Invite Creation Error: ' + err)
                })
        } else if (invParam == 'help') {
            let invHelpEmbed = new Discord.MessageEmbed()
            .setTitle('Invite Command Help Embed')
            .addField('Creating an Invite to Channel', 'pr!inv')
            .addField('Deleting an invite', 'pr!inv delete <invite code, e.g 7jpqmx7>')
            .setFooter('This command manages all the invites in a server.')

            msg.channel.send(invHelpEmbed)
        } else if (invParam == 'delete') {
            let code = args[2]
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (inv delete) in #${msg.channel.name}`))
            msg.guild.fetchInvites()
                .then(invites => {
                    let targetInvite = invites.find(invite => invite.code === code)
                    targetInvite.delete(`${msg.author.tag} deleted an invite with the code ${targetInvite.code} in #${msg.channel.name} that was created by <@${targetInvite.inviter.id}>`)
                    msg.reply('Invite successfully deleted.')
                })
                .catch(err => {
                    msg.reply('An error occurred in deleting that invite. Please ensure that I have Administrator permissions and that you entered the code correctly.')
                    console.log(err)
                })
            return
        }
    }
}