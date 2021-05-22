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
    execute(msg, args, guildData, Prefix, client, Discord) {
        msg.reply(`Hi there! I am PickleRick Bot. My prefix is **${Prefix}**. Say ${Prefix}help to know the commands you can carry out! If you are a mod, I suggest you type in the command '${Prefix}ss help' to know how to properly use this bot. The source of this bot is at https://github.com/Prakhar896/PickleRick-Bot (currently private)`)
        return
    }
}