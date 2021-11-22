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
    name: 'poll',
    description: 'Creates a poll in a channel',
    async execute(msg, args, guildData, Prefix, client, Discord, creatorBypassMode) {
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (msg.author.id == process.env.CREATOR_DISCORD_ID && creatorBypassMode == true) {

        } else {
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
                .then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (poll) in #${msg.channel.name}`)
                    .catch(err => {
                        msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                    }))
        }
        let pollEmbed = new Discord.MessageEmbed()
            .setTitle("Initiating A Poll")
            .setDescription('Start a poll by using $poll <polls channel id, type in \`current\` if you want to send it in the current channel> <poll text>')
            .setColor(0xFFC300);

        if (!args[1]) return msg.channel.send(pollEmbed);

        let msgArgs = args.slice(2).join(" ")
        if (!msgArgs) return msg.reply('Please give the poll\'s content, for e.g \`pr!poll current Are pancakes better than muffins?\`')
        let pollChannel = args[1]
        if (pollChannel == 'current') {
            pollChannel = msg.channel.id
        }
        if (!msg.guild.channels.cache.get(pollChannel)) return msg.reply('That channel does not exist in this server.')
        await msg.guild.channels.cache.get(pollChannel).send("**" + msgArgs + "**")
        .then(msgReaction => {
            msgReaction.react("👍🏻")
            msgReaction.react("👎🏻")
            msg.delete()
        })
        msg.author.send(`Poll was created in #${msg.guild.channels.cache.get(pollChannel).name} that has the ID: ${pollChannel}`)
        msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} created a poll in the channel <#${msg.guild.channels.cache.get(pollChannel)}> with the poll content ${msgArgs}. This poll's command was run in <#${msg.channel.id}>`)
        .catch(err => {
            msg.reply('An error occurred in logging the poll event to the log channel. Please set the log channel using \`pr!ss setlogchannel <id of log channel>\`.')
            console.log('Poll Creation Error (Logging to log channel): ' + err)
            console.log('Guild data of error origin: ' + guildData)
        })
        return
    }
}