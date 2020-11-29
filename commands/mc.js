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
    name: 'mc',
    description: 'Provides information about a Minecraft server',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        let serverIP = args[1]
        if (!serverIP) {
            //send help embed
            let mcHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Minecraft Command Help')
                .addField('Online Server Status', 'Do pr!mc <server IP> to find out a Minecraft Online Server\'s status, like pr!mc play.hypixel.net')
                .setThumbnail('https://thumbs.dreamstime.com/b/minecraft-logo-online-game-dirt-block-illustrations-concept-design-isolated-186775550.jpg');
        }
        msg.reply('Please wait a second while I get the server\'s status')
        mcUtil.status(serverIP)
            .then((response) => {
                const mcEmbed = new Discord.MessageEmbed()
                    .setTitle('Minecraft Server Info')
                    .addField('Server IP', response.host)
                    .addField('Server Version', response.version)
                    .addField('Online Players', response.onlinePlayers)
                    .addField('Max Players', response.maxPlayers);

                msg.channel.send(mcEmbed);
            })
            .catch(() => {
                msg.channel.send('An error occurred in getting the server\'s status.')
            });
        return
    }
}