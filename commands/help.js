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
    name: 'help',
    description: 'Help command for assistance on usage of this bot.',
    execute(msg, args, guildData, Prefix, client, Discord) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        let helpEmbed = new Discord.MessageEmbed()
            .setTitle('PickleRick Bot Help')
            .addField('Information', 'Find out information about members using pr!minfo @..., or do pr!cinfo or pr!sinfo to get channel and server information respectively.')
            .addField('Having Fun', 'To have fun, get a random image from the internet on the default subject of memes with pr!gi <subject (optional and has to have NO spaces)>. Or find out stuff about Fortnite, get started by doing pr!fn help')
            .setThumbnail(msg.author.displayAvatarURL());
        msg.author.send(helpEmbed)
        msg.delete({ timeout: 1000, reason: 'Hides command so normal users cannot see.' })
        return
    }
}