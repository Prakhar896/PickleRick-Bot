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
    name: 'setprefix',
    description: 'Sets the server-wide prefix of this bot',
    execute(msg, args, guildData, Prefix, client, Discord, creatorBypassMode) {
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (msg.author.id == process.env.CREATOR_DISCORD_ID && creatorBypassMode == true) {

        } else {
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
                .then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (setprefix) in #${msg.channel.name}`)
                    .catch(err => {
                        msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                    }))
        }
        let prefixHelpEmbed = new Discord.MessageEmbed()
            .setTitle('$setprefix Command Help')
            .addField('Command Format', '$setprefix <prefix, e.g !>')
            .setThumbnail(msg.author.displayAvatarURL())
            .setColor(0xFF7F50);
        if (!args[1]) return msg.reply(prefixHelpEmbed)
        let newPrefix = args[1];
        msg.reply('Prefix set!')
        msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} set the prefix of this bot as ${newPrefix} in #${msg.channel.name}`)
        .catch(err => {
            msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
        })
        return newPrefix
    }
}