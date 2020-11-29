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
    name: 'info',
    description: 'Sends information about what this bot is.',
    execute(msg, args, logChannel, Prefix) {
        msg.reply(`Hi there! I am PickleRick Bot. My prefix is **${Prefix}**. Say ${Prefix} help to know the commands you can carry out!`)
        return
    }
}