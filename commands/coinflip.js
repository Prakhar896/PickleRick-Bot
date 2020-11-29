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
    name: 'coinflip',
    description: 'Flips a coin and tells the user whether they won what they had bet.',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        let bet = args[1]
        if (!bet) return msg.reply('Please give which side are you betting on.')
        if (bet !== 'heads' && bet !== 'tails') return msg.reply('Bets can only be heads or tails.')
        let randCoinInt = Math.floor((Math.random() * 2) + 1);
        if (randCoinInt == 1) {
            if (bet == 'heads') {
                msg.reply('Coin landed on **heads**! You won!')
                return
            }
            msg.reply('Coin landed on **heads**! You lost!')
        } else {
            if (bet == 'tails') {
                msg.reply('Coin landed on **tails**! You won!')
                return
            }
            msg.reply('Coin landed on **tails**! You lost!')
        }
        return
    }
}