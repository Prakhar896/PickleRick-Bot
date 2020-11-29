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
    name: 'sinfo',
    description: 'Provides information about the server.',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Could not find guild to get information from. Please type this command in a channel.')
        let serverEmbed = new Discord.MessageEmbed()
            .setTitle('Server Info')
            .addField('Name', `${msg.guild.name}`, true)
            .addField('Members', `${msg.guild.memberCount}`, true)
            .addField('Owner', `${msg.guild.owner}`, true)
            .addField('Region', `${msg.guild.region}`, true)
            .addField('Created At', `${msg.guild.createdAt}`)
            .addField('Description', `${msg.guild.description}`, true);
        msg.channel.send(serverEmbed)
        return
    }
}