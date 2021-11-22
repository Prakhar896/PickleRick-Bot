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
    name: 'Nick',
    description: 'Changes the nickname of a user in a guild',
    execute(msg, args, guildData, Prefix, client, Discord, creatorBypassMode) {
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (msg.author.id == process.env.CREATOR_DISCORD_ID && creatorBypassMode == true) {

        } else {
            if (!msg.member.hasPermission('MANAGE_NICKNAMES', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
                .then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (nick) in #${msg.channel.name}`)
                    .catch(err => {
                        msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                    }))
        }
        let user = msg.mentions.users.first()
        let nickHelpEmbed = new Discord.MessageEmbed()
            .setTitle('Nick Command Help')
            .addField('Usage', 'pr!nick @<user> <new nickname>')
            .setFooter('Replace any spaces in the nickname with %, like John%Harrington would be John Harrington.');
        if (!user) return msg.channel.send(nickHelpEmbed)
        let newNickName = args[2]
        if (!newNickName) return msg.channel.send(nickHelpEmbed)
        newNickName = newNickName.split("%").join(" ");
        let memberInGuild = msg.guild.member(user)
        if (!memberInGuild) return msg.reply('That user does not exist in this server.')
        memberInGuild.setNickname(newNickName, `${msg.author.tag} changed the nickname of this user in #${msg.channel.name}`)
            .then(() => {
                msg.channel.send('Nickname set!')
                msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} changed the nickname of ${memberInGuild.user.username} to ${newNickName} in #${msg.channel.name}`)
                    .catch(err => {
                        msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                    })
            })
            .catch(err => {
                msg.reply('An error occurred in setting the nickname of the user. Please ensure that I have Administrator permissions.')
                console.log('Nickname Setting Error: ' + err)
                return
            })
        return
    }
}