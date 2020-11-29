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
    name: 'gi',
    description: 'Provides a random Google Image from the internet on a given subject.',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        let query = args[1]
        if (!query) {
            //no query provided, use default query
            query = 'memes'
            msg.reply(`Please wait a second while I get a random image from online, with the subject **${query}**`)
            image(msg, query)
        } else {
            //image link was provided, get image from link and send
            if (query === "help") {
                let giEmbed = new Discord.MessageEmbed()
                    .setTitle('Google Images Command Help')
                    .addField('Command Format', 'pr!gi <query, e.g food (this is optional)>')
                    .setFooter('Default query is memes')
                    .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F7%2F77%2FGoogle_Images_2015_logo.svg%2F1200px-Google_Images_2015_logo.svg.png&f=1&nofb=1');
                msg.channel.send(giEmbed)
                return
            }
            msg.reply(`Please wait a second while I get a random image from online, with the subject **${query}**`)
            image(msg, query)
        }
        return
    }
}

function image(message, query) {

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + query,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function (error, response, responseBody) {
        if (error) {
            return;
        }
        $ = cheerio.load(responseBody);
        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        if (!urls.length) {
            return;
        }
        // Send result
        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });


}