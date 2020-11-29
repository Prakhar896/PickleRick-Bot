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
    name: 'setprefix',
    description: 'Sets the server-wide prefix of this bot',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (setprefix) in #${msg.channel.name}`))
        let prefixHelpEmbed = new Discord.MessageEmbed()
            .setTitle('$setprefix Command Help')
            .addField('Command Format', '$setprefix <prefix, e.g !>')
            .setThumbnail(msg.author.displayAvatarURL())
            .setColor(0xFF7F50);
        if (!args[1]) return msg.reply(prefixHelpEmbed)
        Prefix = args[1];
        msg.reply('Prefix set!')
        msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} set the prefix of this bot as ${Prefix} in #${msg.channel.name}`)
        return
    }
}