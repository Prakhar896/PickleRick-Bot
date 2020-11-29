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
    name: 'Trivia',
    description: 'Gets a random trivia question varying in difficulty and category from online.',
    execute(msg, args, logChannel) {
        let triviaParam = args[1]
        if (!triviaParam) {
            let triviaHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Trivia Command Help')
                .addField('Categories', 'You can customise the category of trivia questions you would like. To get the full list of all the categories and their IDs, type pr!trivia categories')
                .setThumbnail('https://www.thesynergist.org/wp-content/uploads/2014/09/469564565.jpg')
            msg.channel.send(triviaHelpEmbed);
            return
        }
        (async () => {
            console.log(await triviaDB.getCategories())
            //works with either the id of the category or name
            console.log(await triviaDB.getCategoryInfo(17))
            console.log(await triviaDB.getCategoryInfo("History"))
            console.log(await triviaDB.getToken())
            console.log(await triviaDB.getGlobalQuestionsInfo())
            //replace unused parameters with null
            console.log(await triviaDB.getQuestions(3, null, "hard")) //3 hard questions.
        })()
        return
    }
}