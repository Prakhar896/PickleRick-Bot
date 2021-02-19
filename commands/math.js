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
const math = require('mathjs')

module.exports = {
    name: 'math',
    description: 'Performs a given mathematical operation and returns the result.',
    execute(msg, args, guildData, Prefix, client, Discord) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        // if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (initiatespam) in #${msg.channel.name}`))
        let mathParam = args[1]
        if (!mathParam || mathParam == 'help') {
            let mathHelpEmbed = new Discord.MessageEmbed()
            .setTitle('Math Command Help')
            .addField('Operations', 'pr!math <operation, e.g 5*10>')
            .setFooter('Don\'t worry about your text being italicised or anything else due to typing the multiply or other signs, I can extract the raw form and still perform the operation.')
            msg.channel.send(mathHelpEmbed)
        } else {
            let operation = msg.content.slice(8)
            console.log(operation)
            if (!operation.includes('+') && !operation.includes('-') && !operation.includes('*') && !operation.includes('/')) return msg.reply('Please give a proper operation.')
            let result;
            try {
                result = math.evaluate(operation)
            } catch (err) {
                msg.channel.send('Could not perform operation.')
                console.log('Math Error: ' + err)
                return
            }
            msg.channel.send('The result is: ' + result)
        }
        return
    }
}