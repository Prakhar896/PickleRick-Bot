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
const { encode, decode } = require('url-encode-decode')

module.exports = {
    name: 'Trivia',
    description: 'Gets a random trivia question varying in difficulty and category from online.',
    execute(msg, args, logChannel) {
        let triviaParam = args[1]
        if (!triviaParam || triviaParam == 'help') {
            let triviaHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Trivia Command Help')
                .addField('Categories', 'You can customise the category of trivia questions you would like. To get the full list of all the categories and their IDs, type pr!trivia categories')
                .setThumbnail('https://www.thesynergist.org/wp-content/uploads/2014/09/469564565.jpg')
            msg.channel.send(triviaHelpEmbed);
            return
        }
        if (triviaParam == 'categories') {
            (async () => {
                let triviaEmbed = new Discord.MessageEmbed()
                    .setTitle('List Of Trivia Question Categories')
                    .setThumbnail('https://ilbrainhealth.org/wp-content/uploads/2018/04/trivia-papper-background-illustration-vector.jpg?w=300')
                let categories = await triviaDB.getCategories()
                for (const category of categories.trivia_categories) {
                    triviaEmbed.addField(category.name, `ID: ${category.id}`, true)
                }
                msg.channel.send(triviaEmbed)

            })()
        } else if (triviaParam == 'qn') {
            (async () => {
                let questionJSON = await triviaDB.getQuestions(1, null, null, null, null, 'url3986')
                console.log(decode(questionJSON.results[0].correct_answer))
                let qnType;
                if (questionJSON.results[0].type == 'boolean') {
                    qnType = 'True Or False'
                } else {
                    qnType = 'Open-Ended'
                }
                let qnEmbed = new Discord.MessageEmbed()
                .setTitle(decode(questionJSON.results[0].question))
                .addField('Category', decode(questionJSON.results[0].category), true)
                .addField('Type', qnType, true)
                .addField('Difficulty', questionJSON.results[0].difficulty)
                .setFooter('You have 10 seconds to respond to this question.');
                msg.channel.send(qnEmbed)
                const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                collector.on('collect', response => {
                    let responseAsString = response.toString()
                    let lowerCasedResponse = responseAsString.toLowerCase();
                    let answer = decode(questionJSON.results[0].correct_answer)
                    if (lowerCasedResponse == answer.toLowerCase()) {
                        msg.reply(`**You were right!** The answer is ${answer}!`)
                        return
                    } else {
                        msg.reply(`WRONG ANSWER! The answer was ${answer}!`)
                        return
                    }
                })
            })()
        }
        // //works with either the id of the category or name
        // console.log(await triviaDB.getCategoryInfo(17))
        // console.log(await triviaDB.getCategoryInfo("History"))
        // console.log(await triviaDB.getToken())
        // console.log(await triviaDB.getGlobalQuestionsInfo())
        // //replace unused parameters with null
        // console.log(await triviaDB.getQuestions(3, null, "hard")) //3 hard questions.
        return
    }
}