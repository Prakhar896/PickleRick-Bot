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
const wiki = require('wikipedia')

module.exports = {
    name: 'wiki',
    description: 'Searches Wikipedia for an article related to a search.',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        // if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (initiatespam) in #${msg.channel.name}`))
        let query = args[1]
        if (!query) return msg.reply('Please give the name of the Wikipedia page you would like to get. Ensure that any spaces are replaced with the % sign.')
        query = query.split('%').join(' ');
        let wikiHelpEmbed = new Discord.MessageEmbed()
            .setTitle('Wikipedia Search Help')
            .addField('Format', 'The format for the wiki command is: pr!wiki <query name, with spaces replaced with the % sign> <level of detail, optional>')
            .addField('What is Level Of Detail?', 'Level of details is, as the name suggessts, the amount of information you want to get from the Wikipedia article online. There are 3 levels: low, medium and high. Information on them is listed below.')
            .addField('Low Level Of Detail', 'Information is displayed in a small embed and the information is pretty small, like say the first few sentences of the article, along with a picture. This is useful for quick knowledge on a topic.')
            .addField('Medium Level Of Detail', 'Information displayed in this level (and the high level) is sent in multiple messages. Things like the page\'s image URL is also sent alont with a few paragraphs of the article. Please wait a while while all the information is sent as Discord may take a while to send it.')
            .addField('High Level Of Detail', 'The whole article\'s content will slowly be sent in this level. Things like related pages to the article will also be sent. **Warning: All of the information may take a while to be sent as the entire article is slowly being sent. The waiting time depends on the length of the article.**')
            .setFooter('If you do not put the level of detail at the back, the bot will default to the Low level of detail and send information accordingly.')
        if (query == 'help') return msg.channel.send(wikiHelpEmbed)
        let levelOfDetail = args[2]
        if (!levelOfDetail) levelOfDetail = 'low'
        if (levelOfDetail != 'low' && levelOfDetail != 'medium' && levelOfDetail != 'high') return msg.reply('Please give a proper level of detail. Acceptable level of details are \'low\', \'medium\' and \'high\'. Type pr!wiki help to know more.')
        msg.reply(`Searching Wikipedia for **${query}**, with *${levelOfDetail}* level of detail...`);
        (async () => {
            try {
                const page = await wiki.page(query);
                let summary = await page.summary()
                if (!summary) return msg.reply('Unable to find an article on Wikipedia.')
                // console.log(summary)
                if (summary.extract.includes('may refer to:')) return msg.reply(`\'${query}\' could refer to multiple things. Please provide the specific title of a page to get the information on. URL: ${summary.content_urls.desktop.page}`)

                if (levelOfDetail == 'low') {
                    let wikiEmbed = new Discord.MessageEmbed()
                        .setTitle(summary.title)
                        .addField('Description:', summary.description);
                    let extract = summary.extract
                    if (extract.length >= 1024) {
                        while (extract.length >= 1024) {
                            wikiEmbed.addField('Information: ', extract.slice(0, 1024))
                            extract = extract.slice(1024)
                        }
                        if (extract) wikiEmbed.addField('Information: ', extract)
                    } else {
                        wikiEmbed.addField('Information: ', extract)
                    }
                    wikiEmbed.setFooter('URL: ' + summary.content_urls.desktop.page)
                    if (summary.thumbnail) wikiEmbed.setThumbnail(summary.thumbnail.source)
                    msg.channel.send(wikiEmbed)
                } else if (levelOfDetail == 'medium') {
                    msg.channel.send('The article from Wikipedia is shown below: (please wait a moment while all the information is sent)')
                    msg.channel.send('---')
                    msg.channel.send('***' + summary.title + '***')
                    msg.channel.send(`**Description:**`)
                    msg.channel.send(summary.description)
                    msg.channel.send('**Information:**')
                    let intro = await page.intro()
                    while (intro.length >= 2000) {
                        msg.channel.send(intro.slice(0, 2000))
                        intro = intro.slice(2000)
                    }
                    if (intro) msg.channel.send(intro)
                    if (summary.thumbnail) {
                        msg.channel.send('Image URL: ' + summary.thumbnail.source)
                    }
                    msg.channel.send('Language: ' + summary.lang)
                    msg.channel.send('Article URL: ' + summary.content_urls.desktop.page)
                    msg.channel.send('**End Of Information**')
                    msg.channel.send('---')
                } else if (levelOfDetail == 'high') {
                    let relatedPagesEmbed = new Discord.MessageEmbed()
                        .setTitle(`Related pages to ${summary.title}`)
                        .setFooter('Type the name of the pages listed to view information about them.');
                    let relatedPages = await page.related()
                    for (var relatedPage of relatedPages.pages) {
                        relatedPagesEmbed.addField(relatedPage.title, relatedPage.content_urls.desktop.page)
                    }
                    msg.channel.send('The article from Wikipedia is shown below: (please wait a moment while all the information is sent)')
                    msg.channel.send('---')
                    msg.channel.send('***' + summary.title + '***')
                    msg.channel.send(`**Description:**`)
                    msg.channel.send(summary.description)
                    msg.channel.send('**Information:**')
                    let content = await page.content()
                    while (content.length >= 2000) {
                        msg.channel.send(content.slice(0, 2000))
                        content = content.slice(2000)
                    }
                    if (content) msg.channel.send(content)
                    if (summary.thumbnail) {
                        msg.channel.send('**Image URL:** ' + summary.thumbnail.source)
                    }
                    msg.channel.send(relatedPagesEmbed)
                    msg.channel.send('**Language:** ' + summary.lang)
                    msg.channel.send('**Article URL:** ' + summary.content_urls.desktop.page)
                    msg.channel.send('**End Of Information**')
                    msg.channel.send('---')
                }
            } catch (error) {
                msg.reply('No Wikipedia Page exists similar to the title \'' + query + '\'')
                console.log(error);
                //=> Typeof wikiError
            }
        })();
        return
    }
}