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
const indexjs = require('../index');
const setname = require('./ssCmdFiles/setname');
const setsyschannel = require('./ssCmdFiles/setsyschannel');
const setruleschannel = require('./ssCmdFiles/setruleschannel');
const setverlevel = require('./ssCmdFiles/setverlevel');
const setmainrole = require('./ssCmdFiles/setmainrole');
const setmuterole = require('./ssCmdFiles/setmuterole');
const setlogchannel = require('./ssCmdFiles/setLogChannel');
const ssHelp = require('./ssCmdFiles/ssHelp');
const autosetup = require('./ssCmdFiles/autosetup');
const setdeletelogs = require('./ssCmdFiles/setdeletelogs');
const createSuggest = require('./ssCmdFiles/createSuggest');
const autoroles = require('./ssCmdFiles/autoroles');
const profanityfilter = require('./ssCmdFiles/profanityfilter');

module.exports = {
    name: 'ss',
    description: 'Allows moderator to change some server\'s setting using the bot.',
    execute(msg, args, guildData, Prefix, client, Discord, creatorBypassMode) {
        if (args[1] != 'autosetup' && args[1] != 'current' && args[1] != 'setlogchannel' && args[1] != 'help') {
            if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        }
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
            .then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (ss) in #${msg.channel.name}`)
                .catch(err => {
                    msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                }))

        let ssParam = args[1]

        if (ssParam == 'current') {

            const ssCurrentEmbed = currentSettingsEmbed(msg, guildData);
            msg.channel.send(ssCurrentEmbed)

        } else if (ssParam == 'setname') {
            setname.execute(msg, args, guildData)
        } else if (ssParam == 'setsyschannel') {

            setsyschannel.execute(msg, args, guildData)

        } else if (ssParam == 'setruleschannel') {

            setruleschannel.execute(msg, args, guildData)

        } else if (ssParam == 'setverlevel') {

            setverlevel.execute(msg, args, guildData)

        } else if (ssParam == 'setmainrole') {

            var newData = guildData
            setmainrole.execute(msg, args, guildData)
                .then(newGuildData => {
                    if (!newGuildData.mainRole) return
                    newData = newGuildData
                })
            return newData

        } else if (ssParam == 'setmuterole') {

            var newData = guildData
            setmuterole.execute(msg, args, guildData)
                .then(newGuildData => {
                    if (!newGuildData.muteRole) return
                    newData = newGuildData
                })
            return newData

        } else if (ssParam == 'setlogchannel') {

            var newData = guildData
            setlogchannel.execute(msg, args, guildData)
                .then(newGuildData => {
                    if (!newGuildData.logChannel) return
                    newData = newGuildData
                })
            return newData

        } else if (ssParam == 'help') {

            ssHelp.execute(msg, args, guildData)

        } else if (ssParam == 'autosetup') {

            var newData = guildData
            autosetup.execute(msg, args, guildData, currentSettingsEmbed)
                .then(newGuildData => {
                    if (!newGuildData.logChannel) return
                    newData = newGuildData
                })
            return newData

        } else if (ssParam == 'setdeletelogs') {

            var newData = guildData
            setdeletelogs.execute(msg, args, guildData)
                .then(newGuildData => {
                    if (!newGuildData.allowsDeleting) return
                    newData = newGuildData
                })
            return newData

        } else if (ssParam == 'create.suggest') {

            createSuggest.execute(msg, args, guildData)

        } else if (ssParam == 'ar') {

            var newData = guildData
            autoroles.execute(msg, args, guildData)
                .then(newGuildData => {
                    if (!newGuildData.autorolesEnabled) return
                    newData = newGuildData
                })
            return newData

        } else if (ssParam == 'profanityfilter') {
            
            var newData = guildData
            profanityfilter.execute(msg, args, guildData)
            .then(newGuildData => {
                if (!newGuildData.giProfanityFilterEnabled) return
                newData = newGuildData
            })
            return newData

        }
        return guildData
    }
}


// Make current settings embed
function currentSettingsEmbed(msg, guildData) {
    let mainRoleStatus;
    let muteRoleStatus;
    let logChannelStatus;
    if (!guildData.mainRole) { mainRoleStatus = 'Not Set' } else { mainRoleStatus = guildData.mainRole }
    if (!guildData.muteRole) { muteRoleStatus = 'Not Set' } else { muteRoleStatus = guildData.muteRole }
    if (!guildData.logChannel) { logChannelStatus = 'Not Set' } else { logChannelStatus = guildData.logChannel }
    let ssCurrentEmbed = new Discord.MessageEmbed()
        .setTitle(`Server Settings for ${msg.guild.name}`)
        .addField(`Name`, `${msg.guild.name}`)
        .addField('Description', `${msg.guild.description}`)
        .addField('Owner', `${msg.guild.owner.user.tag}`)
        .addField('System Channel', `<#${msg.guild.systemChannelID}>`)
        .addField('Rules Channel', `<#${msg.guild.rulesChannelID}>`)
        .addField('Verification Level', `${msg.guild.verificationLevel}`)
        .addField('Main Role', `${mainRoleStatus}`)
        .addField('Mute Role', `${muteRoleStatus}`)
        .addField('Logging Of Deleted Messages', `${guildData.allowsDeleting}`)
        .addField('Google Images Profanity Filter Enabled:', `${guildData.giProfanityFilterEnabled}`)
        .addField('AutoRoles Enabled:', `${guildData.autorolesEnabled}`)
        .setFooter(`Requested by Admin: ${msg.author.tag} in #${msg.channel.name}`);
    if (logChannelStatus != 'Not Set') {
        ssCurrentEmbed.addField('Log Channel', `<#${msg.guild.channels.cache.get(logChannelStatus).id}>`);
    } else {
        ssCurrentEmbed.addField('Log Channel', `Not Set`);
    }
    return ssCurrentEmbed
}