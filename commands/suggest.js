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
    name: 'suggestions',
    description: 'Allows members of a server to suggest something to the mods like features.',
    execute(msg, args, guildData, Prefix, client, Discord, creatorBypassMode) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        // if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (initiatespam) in #${msg.channel.name}`))
        const channel = msg.guild.channels.cache.find(c => c.name === 'suggestions' || c.name === 'suggest' || c.name == 'recommendations')
        if (!channel) return msg.channel.send('There is no suggestions channel in this server. Type in \`pr!ss create.suggest\` to create a suggestions channel or contact the mods to use the command if you are a member.')
        let messageSuggestion = args.join(' ')
        if (!messageSuggestion) return msg.reply('Please add the message of the suggestion, e.g Make a Server Booster role!')
        messageSuggestion = messageSuggestion.slice(8)
        const suggestEmbed = new Discord.MessageEmbed()
        .setColor('FADF2E')
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL( { dynamic: true }))
        .setDescription(messageSuggestion)

        channel.send(suggestEmbed)
        .then(message => {
            message.react('👍🏻')
            .catch(err => {
                msg.reply('An error occurred in executing the command. Please try again!')
                console.log('Suggestion Command Error (Error adding reaction to msg): ' + err)
            })
            message.react('👎🏻')
            .catch(err => {
                msg.reply('An error occurred in executing the command. Please try again!')
                console.log('Suggestion Command Error (Error adding reaction to msg): ' + err)
            })
            msg.author.send(`The suggestion \`${messageSuggestion}\` has been made in #${channel.name}.`)
            .catch(err => {
                msg.reply('An error occurred in executing the command. Please try again!')
                console.log('Suggestion Command Error (Error in sending message to author): ' + err)
            })
            msg.delete()
            .catch(err => {
                msg.reply('An error occurred in executing the command. Please try again!')
                console.log('Suggestion Command Error (Error in deletion of msg): ' + err)
            })
        })
        .catch(err => {
            msg.reply('An error occurred in executing the command. Please try again!')
            console.log('Suggestion Command Error: ' + err)
        })
        return
    }
}