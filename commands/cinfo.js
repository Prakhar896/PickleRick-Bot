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
    name: 'cinfo',
    description: 'Provides the channel\'s information.',
    execute(msg, args, guildData, Prefix, client, Discord, creatorBypassMode) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (!msg.channel) return msg.reply('Could not find channel to get information from. Please type this command in a channel.')
        let channelEmbed = new Discord.MessageEmbed()
            .setTitle('Channel Info')
            .addField('Name', `#${msg.channel.name}`, true)
            .addField('ID', `${msg.channel.id}`, true)
            .addField('Topic', `${msg.channel.topic}`, true)
            .addField('Guild Name', `${msg.guild.name}`, true)
            .addField('Guild ID', `${msg.guild.id}`, true)
            .addField('Created At', `${msg.channel.createdAt}`, true)
            .addField('Is NSFW', `${msg.channel.nsfw}`, true)
            .setThumbnail(msg.guild.bannerURL);
        msg.channel.send(channelEmbed);
        return
    }
}