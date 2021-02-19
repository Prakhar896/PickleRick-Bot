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
    name: 'fn',
    description: 'Displays information about something or someone related to Fortnite',
    execute(msg, args, guildData, Prefix, client, Discord) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        let fnParam = args[1]
        if (fnParam === 'help') {
            //create and send embed
            let fnHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Fortnite Commands Help')
                .addField('Fortnite Map', 'You can get the fortnite map using the command pr!fn map')
                .addField('Fortnite User Stats', 'Get stats on a specifc user from online via pr!fn stats <username, e.g Lachy>. Additionally, you can add an account type at the back, like pr!fn stats PWR%Lachy epic, to make account-specific queries. Accepted account types are epic, psn and xbl. (case-sensitive).')
                .addField('Fortnite Creator Code Details', 'Get information on a creator code using pr!fn cc <creator code, with spaces replaced with %>, e.g: \'pr!fn cc Lachy\'')
                .addField('Fortnite News', 'Get the latest fortnite news with pr!fn news. the image also refreshes to other tabs.')
                .addField('Fortnite Cosmetics', 'Find out more information about a cosmetic with pr!fn cos <name of cosmetic, with spaces replaced with %>')
                .setThumbnail('https://thumbs.dreamstime.com/b/fortnite-white-vector-logo-black-textured-background-online-game-editorial-illustration-144436055.jpg');
            msg.channel.send(fnHelpEmbed)
        }

        //Map
        if (fnParam === "map") {
            //get map
            fortniteStats.BRMap('en')
                .then(res => {
                    msg.channel.send(res.data.images.pois)
                }).catch(err => {
                    console.log('An error occurred: ' + err)
                })
        } else if (fnParam === "stats") {
            //get user stats
            //param variables
            if (!args[2]) return msg.reply('Please give the user\'s name')
            let username = args[2].split("%").join(" ");
            if (!username) return msg.reply('Please give the user\'s name')
            let accountType = args[3]
            if (!accountType) {
                let params = { name: username, image: 'all' }
                getFnStats(msg, params, fortniteStats)
            } else if (accountType === 'epic' || accountType === 'psn' || accountType === 'xbl') {
                let params = { name: username, accountType: accountType, image: 'all' }
                getFnStats(msg, params, fortniteStats)
            } else {
                msg.reply('Invalid account type. Valid account types include only epic, psn and xbl, all of which are case-sensitive.')
                return
            }
        } else if (fnParam === 'troubleshoot') {
            let fnTrblshtEmbed = new Discord.MessageEmbed()
                .setTitle('Fortnite Command Error Troubleshooting')
                .addField('pr!fn map', 'If you are having trouble in getting the map, it is probably because Fortnite is mid-update or the API servers are down. Please try again in a few hours.')
                .addField('pr!fn stats <user> <accountType>', 'If you are getting this error, it is probably because the user you want to get stats on doesn\'t exist in the query. Also, ensure that you replace any spaces in the name with %, as this also can cause errors. The reason could also be that you typed an invalid account type, accepted account types are epic, psn and xbl (case-sensitive). If not, try, if you had made a account-based query, not making one or if you did make an account-based query, try making a global one.')
                .addField('pr!fn cc <creator code>', 'Ensure you are typing the creator code correctly as the code is case-sensitive. Also, if the code has spaces, ensure tha you replace them with %, like: Royal%Warrior')
            msg.channel.send(fnTrblshtEmbed)
        } else if (fnParam === 'cc') {
            let name = args[2]
            if (!name) return msg.reply('Please provide the creator code to get details on.')
            name = name.split("%").join(" ");
            if (typeof name !== 'string') return msg.reply('Please provide a proper creater code')
            msg.reply('Please wait a moment while I get the details on the creator code.')
            fortniteStats.CreatorCode(name)
                .then(res => {
                    let fnCCEmbed = new Discord.MessageEmbed()
                        .setTitle(`${name} Creator Code Details`)
                        .addField('Code', `${res.data.code}`)
                        .addField('Owner Account ID and Name', `ID: ${res.data.account.id}, Name: ${res.data.account.name}`)
                        .addField('Is Verified', `${res.data.verfiied}`);
                    msg.channel.send(fnCCEmbed)
                }).catch(err => {
                    msg.channel.send('An error occurred in getting the creator code details. Type pr!fn troubleshoot for help.')
                    console.log(err)
                })
        } else if (fnParam === 'news') {
            msg.reply('Please wait a moment while I get the latest Battle Royale news.')
            fortniteStats.NewsBR('en')
                .then(res => {
                    msg.channel.send(res.data.image)
                }).catch(err => {
                    msg.channel.send('An error occurred in getting the news. The API servers could be down. Try again in a few minutes.')
                    console.log(err)
                })
        } else if (fnParam === 'cos') {
            let name = args[2]
            if (!name) return msg.reply('Please give the name of the cosmetic you want information on.')
            if (typeof name !== 'string') return msg.reply('Please give the proper name of the cosmetic.')
            name = name.split("%").join(" ");
            msg.reply('Please wait a moment while I search for the Fortnite cosmetic with the given name.')
            fortniteStats.CosmeticsSearch({ name: name })
                .then(res => {
                    let fnCosEmbed = new Discord.MessageEmbed()
                        .setTitle(`${name} Cosmetic Details`)
                        .addField('Name And ID', `Name: ${name}, ID: ${res.data.id}`)
                        .addField('Description', res.data.description)
                        .addField('Rarity', res.data.rarity.value)
                        .addField('Introduction', `Chapter ${res.data.introduction.chapter}, Season ${res.data.introduction.season}`)
                        .addField('Added On', `${res.data.added}`);
                    msg.channel.send(res.data.images.featured)
                    msg.channel.send(fnCosEmbed)
                }).catch(err => {
                    msg.channel.send('An error occurred in getting the cosmetic\'s name. Ensure that you typed it correctly and that you replaced any spaces with %')
                    console.log(err)
                })
        }
        return
    }
}

function getFnStats(msg, params, fortniteStats) {
    msg.reply('Please wait while I get the user\'s Fortnite stats from online.')
    fortniteStats.BRStats(params)
        .then(res => {
            msg.channel.send(res.data.image)
            let fnStatsEmbed = new Discord.MessageEmbed()
                .setTitle(`${params.name}'s Statistics`)
                .addField('Account ID', res.data.account.id)
                .addField('Name', res.data.account.name)
                .addField('Battle Pass Level', res.data.battlePass.level)
                .addField('Battle Pass Progress', res.data.battlePass.progress)
                .addField('LTM Score Per Match', res.data.stats.all.ltm.scorePerMatch)
                .addField('LTM Wins', res.data.stats.all.ltm.wins)
                .addField('LTM Kills', res.data.stats.all.ltm.kills)
                .addField('LTM KD Ratio', res.data.stats.all.ltm.kd)
                .setThumbnail('https://thumbs.dreamstime.com/b/fortnite-white-vector-logo-black-textured-background-online-game-editorial-illustration-144436055.jpg');
            msg.channel.send(fnStatsEmbed)
        }).catch(err => {
            msg.reply('An error occurred in getting the user\'s Fortnite stats. Type pr!fn troubleshoot for help.')
            console.log(err)
        })
}