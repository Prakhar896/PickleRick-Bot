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
    name: 'poll',
    description: 'Creates a poll in a channel',
    async execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('THIS IS A MOD-ONLY COMMAND, YOU DO NOT HAVE PERMISSIONS TO USE THIS COMMAND. THIS ACTION WILL BE LOGGED').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (poll) in #${msg.channel.name}`))
        let pollEmbed = new Discord.MessageEmbed()
            .setTitle("Initiating A Poll")
            .setDescription('Start a poll by using $poll <polls channel id> <poll text>')
            .setColor(0xFFC300);

        if (!args[1]) return msg.channel.send(pollEmbed);

        let msgArgs = args.slice(2).join(" ")

        await msg.guild.channels.cache.get(args[1]).send("**" + msgArgs + "**")
        .then(msgReaction => {
            msgReaction.react("👍🏻")
            msgReaction.react("👎🏻")
            msg.delete()
        })
        msg.author.send(`Poll was created in #${msg.guild.channels.cache.get(args[1]).name} that has the ID: ${args[1]}`)
        return
    }
}