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
    execute(msg, args, guildData, Prefix, client, Discord, creatorBypassMode) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        let bet = args[1]
        if (!bet) return msg.reply('Please give which side are you betting on. If you want to use scenario mode, type scenario.')
        if (bet !== 'heads' && bet !== 'tails' && bet != 'scenario' && bet != 'help') return msg.reply('Bets can only be heads or tails. If you want to use scenario mode, type pr!coinflip scenario')
        let randCoinInt = Math.floor((Math.random() * 2) + 1);
        if (bet == 'scenario') {
            msg.channel.send('Scenario Mode: Type the 1st scenario (that would represent heads), e.g Chocolates are the best thing in the world! You have 10 seconds to type.')
            const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
            collector.on('collect', response => {
                let headsScenario = response
                collector.stop()
                msg.channel.send('Scenario Mode: Type the 2nd scenario (that would represent tails), e.g Chocolates are the worst thing in the world!')
                const tailsCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                tailsCollector.on('collect', tailResponse => {
                    let tailsScenario = tailResponse
                    if (randCoinInt == 1) {
                        msg.channel.send(`Coin landed on **heads**! Scenario \'${headsScenario}\' won!`)
                        tailsCollector.stop()
                        return
                    } else {
                        msg.channel.send(`Coin landed on **tails**! Scenario \'${tailsScenario}\' won!`)
                        tailsCollector.stop()
                        return
                    }
                })
            })
            return
        }
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