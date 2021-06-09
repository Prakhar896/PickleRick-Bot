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
    name: '',
    description: '',
    execute(msg, args, guildData, Prefix, client, Discord) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        if (!msg.guild.channels.cache.get(guildData.logChannel)) return msg.reply('The ID of the log channel is incorrect in my bot records. Please re-set the log channel ID in server settings for this command to work.')
        // if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
        //.then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (//command name) in #${msg.channel.name}`)
        // .catch(err => {
        //     msg.reply(`Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`${Prefix}ss setlogchannel <id of log channel>\` to set the log channel.`)
        // }))

        //actual code
        var roleParams = args[1]
        if (!roleParams) return msg.reply('Please give the role you would would like to get information on in normal text. E.g: \`pr!rinfo Club Members\`.')
        if (roleParams == 'help') {
            let helpEmbed = new Discord.MessageEmbed()
                .setTitle('Role Information Help')
                .setDescription('This command allows you to get information on a certain role.')
                .addField('Usage:', `\`${Prefix}rinfo <role name in text, with spaces replaced with %>\``)
                .setColor('AQUA');
            msg.channel.send(helpEmbed)
            return
        }
        roleParams = roleParams.split('%').join(' ')
        var role = msg.guild.roles.cache.find(r => r.name === roleParams)
        if (!role) return msg.reply(`Sorry, no such role exists in this server. Type \`${Prefix}rinfo help\` for help.`)
        var roleEmbed = new Discord.MessageEmbed()
            .setTitle(`Information on ${role.name}`)
            .addField('Name:', `${role.name}`, true)
            .addField('ID:', `${role.id}`, true)
            .addField('Number of Members with it:', `${role.members.size} Members`)
            .addField('Mentionable:', `${role.mentionable}`, true)
            .addField('Created At:', `${role.createdAt}`)
            .addField('Colour in Hex Code:', `${role.hexColor}`, true)
            .setColor(role.hexColor)
            .addField('Has Admin Permissions:', `${role.permissions.has('ADMINISTRATOR')}`);
        msg.channel.send(roleEmbed)
            .then(() => {
                msg.guild.channels.cache
                    .get(guildData.logChannel)
                    .send(`<@${msg.author.id}> requested for information on the role \`${role.name}\` in <#${msg.channel.id}>.`)
            })
        return
    }
}