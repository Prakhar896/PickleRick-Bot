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
var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
        headless: true
    }
})

module.exports = {
    name: 'gi',
    description: 'Provides a random Google Image from the internet on a given subject.',
    async execute(msg, args, guildData, Prefix, client, Discord) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        var image_query = args.slice(1).join(' ');
        if (!image_query) {
            image_query = 'memes'
        } else if (image_query == 'help') {
            let giEmbed = new Discord.MessageEmbed()
                    .setTitle('Google Images Command Help')
                    .addField('Command Format', 'pr!gi <query, e.g food (this is optional)>')
                    .setFooter('Default query is memes')
                    .setColor('AQUA')
                    .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F7%2F77%2FGoogle_Images_2015_logo.svg%2F1200px-Google_Images_2015_logo.svg.png&f=1&nofb=1');
                msg.channel.send(giEmbed)
            return
        }
        msg.reply(`Please wait a second while I get a random image from online, with the subject **${image_query}**`)

        const image_results = await google.scrape(image_query, 200);
        msg.channel.send(image_results[Math.floor((Math.random() * image_results.length) + 1)].url)
        return
    }
}