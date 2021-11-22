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
const weather = require('weather-js');

module.exports = {
    name: 'weather',
    description: 'Shows the current weather in a specific city',
    execute(msg, args, guildData, Prefix, client, Discord, creatorBypassMode) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        //if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        // if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
        //.then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (//command name) in #${msg.channel.name}`)
        // .catch(err => {
        //     msg.reply(`Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`${Prefix}ss setlogchannel <id of log channel>\` to set the log channel.`)
        // }))

        //actual code
        var searchQuery = args.slice(1).join(' ')
        if (!searchQuery) return msg.reply('Please give the location of the place you would like to get, for e.g: `pr!weather Singapore`')
        weather.find({ search: searchQuery, degreeType: 'C' }, function (err, result) {
            if (err) {
                console.log('Error in fetching Weather: ' + err)
                msg.reply('Sorry, an error occurred in fetching the weather for this location: `' + err + '`')
                return
            } else if (result[0]) {
                let location = result[0].location.name
                let currentWeather = result[0].current
                let temp = currentWeather.temperature
                let skyStatus = currentWeather.skytext
                let dayText = currentWeather.day + ', ' + currentWeather.date
                let humidity = currentWeather.humidity
                let windDirectionAndStrength = currentWeather.winddisplay
                let weatherEmbed = new Discord.MessageEmbed()
                    .setTitle('Weather for ' + location)
                    .addField('Temperature:', temp + ' Degrees Celsius')
                    .addField('Sky:', skyStatus)
                    .addField('Day:', dayText)
                    .addField('Humidity:', humidity)
                    .addField('Wind:', windDirectionAndStrength)
                    .setColor('YELLOW')
                    .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.UpYmPnvCcGJP2Ea4vdniHwHaHa%26pid%3DApi&f=1');
                msg.channel.send(weatherEmbed)
            } else {
                msg.reply('Sorry, the weather for this location could not be gotten. Please try another location.')
                return
            }
        })
        return
    }
}