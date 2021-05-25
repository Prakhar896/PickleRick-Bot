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
    name: '',
    description: '',
    execute(msg, args, guildData, Prefix, client, Discord) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        //if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        // if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
        //.then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (//command name) in #${msg.channel.name}`)
        // .catch(err => {
        //     msg.reply(`Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`${Prefix}ss setlogchannel <id of log channel>\` to set the log channel.`)
        // }))

        //actual code
        return
    }
}

//Collector template
const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
collector.on('collect', response => {
    
})