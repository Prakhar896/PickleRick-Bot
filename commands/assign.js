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
    name: 'assign',
    description: 'Assigns a role to a member',
    execute(msg, args, guildData, Prefix, client, Discord) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
            .then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (initiatespam) in #${msg.channel.name}`)
                .catch(err => {
                    msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                }))
        //actual code
        var roleName = args[1]
        if (!roleName) return msg.reply('Please give the name of the role you would like to assign.')
        roleName = args[1].split("%").join(" ");
        let helpEmbed = new Discord.MessageEmbed()
            .setTitle('Assign Role Command Help')
            .setDescription('This command allows moderators to easily assign roles to members with a single command.')
            .addField('Format', `${Prefix}assign <role name, with spaces replaced with the % sign> @member`)
            .setColor('AQUA')
            .addField('Example:', `${Prefix}assign main%role @Jake`);

        if (roleName == 'help') return msg.channel.send(helpEmbed).catch(err => { msg.reply('An error occurred in sending the help embed. Err: ' + err) })
        let roleObject = msg.guild.roles.cache.find(r => r.name === roleName)
        if (!roleObject) return msg.reply('No such role exists in this server. Please try again.')
        let targetUser = msg.mentions.users.first();
        if (!targetUser) return msg.reply('Please mention the member whom you would like to give the role to.')
        let targetMember = msg.guild.members.cache.find(m => m.id === targetUser.id)
        if (!targetMember) return msg.reply('The person you mentioned does not exist in this server.')
        targetMember.roles.add(roleObject.id)
        .then(() => {
            msg.reply(`Successfully added ${roleName} to <@${targetMember.id}>.`)
            return
        })
        .catch(err => {
            msg.reply('An error occurred in adding the role to the member. Ensure that he/she does not have Administrator Permissions and that my role is at the top of the role hierarchy.')
            console.log('Assign Role Error (Failed to add role to member): ' + err)
            return
        })
        return
    }
}