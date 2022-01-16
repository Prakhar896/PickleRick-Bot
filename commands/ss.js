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
            let logChannelID = args[2]
            if (!logChannelID) return msg.reply('Please give the ID of the new log channel in this server.')
            if (!msg.guild.channels.cache.get(logChannelID)) return msg.reply('That channel does not exist in this server.')
            msg.reply(`Log Channel set to <#${logChannelID}> successfully.`)
            let newGuildData = guildData
            newGuildData.logChannel = logChannelID
            return newGuildData
        } else if (ssParam == 'help') {
            let ssHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Server Settings Help')
                .addField('NOTE:', 'This bot is quite complex to use and all information listed below will take a minute to take in. It is worth the time reading through all the help for newer servers using me! Enjoy using PickleRick!!!')
                .addField('pr!ss current', 'Shows all the current settings of the Discord server in an embed.', true)
                .addField('pr!ss setname <name>', 'Sets the new name of the Discord server.', true)
                .addField('pr!ss setsyschannel <channel ID>', 'Sets the the server\'s default system channel where all system messages such as new members joining are sent from the system.', true)
                .addField('pr!ss setruleschannel <channel ID>', 'Sets the system rules channel for people to go to check out your server\'s rules and guidelines. The rules channel will have a special book and tickmark icon to indicate it is a rules channel', true)
                .addField('pr!ss setverlevel <verification level>', 'Sets the verification level required to join the server. Get more information on this command using pr!ss setverlevel help', true)
                .addField('pr!ss setmainrole <main role name, with spaces replaced with %>', 'Sets the main role of the server in the bot\'s settings. This role, upon choice, will be used for muting people and also adding a role to new people who join the server, this, it is crucial to run this command when I join the server.', true)
                .addField('pr!ss setmuterole <mute role name, with spaces replaced with %', 'Sets the mute role of the server in the bot\'s settings. This role will be used by the bot to mute people. A mute role is a role that has disadvantaged permissions causing members to not be able to send messages and is used as a punishment by moderators for notorious members.', true)
                .addField('pr!ss setlogchannel <log channel ID>', 'Sets the log channel of the server in the bot. This allows the bot to log important changes or commands that have been executed in the log channel for Admins or Mods to later look back at if needed. This command is also pretty crucial and I recommend that every server have a log channel.', true)
                .addField('pr!ss autosetup <main role name, spaces replaced with %> <mute role name, spaces replaced with %> <log channel ID>', 'Runs an auto-setup command that quickly sets the bot\'s main role, mute role and log channel. The command is quite complexed but if you know and understand how to use it, it is pretty good to use, especially for new servers.')
                .addField('Spaces Replaced With % Formatting', 'In this bot, most commands have this style of formatting where spaces are replaced with the % sign, like pr!initiatespam hello%there 10 <channel ID>. This is to allow the bot to register commands quickly and properly and execute them as quickly as possible.', true)
                .addField('pr!ss setdeletelogs <true or false>', 'This setting allows you to control whether the bot should report the deletion of messages throughout the server to the log channel. true means you allow and false means you don\'t')
                .addField('pr!ss create.suggest', 'Creates a suggestion channel in the server for the pr!suggest command. Please do not rename this channel but you can change its permissions as you like.')
                .addField('pr!ss profanity filter <true | false>', 'Turn on or off a profanity filter on the search queries I search to mitigate explicit media being sent.')
                .addField('pr!ss ar <true | false>', 'Turn on or off the AutoRoles feature of the bot. This feature will automatically add the main role to new members who join the server.')
                .setFooter('Do pr!cmdlist to view the full list of commands that can be executed.')
            msg.channel.send(ssHelpEmbed)
        } else if (ssParam == 'autosetup') {
            msg.reply('Running auto-setup with given fields.')
            //Set main role
            let mainRole = args[2]
            if (!mainRole) return msg.reply('Please give the name of the main role you would like to set as the new Main role. Do note that any spaces should be replace with the % sign. Auto-setup failed.')
            mainRole = mainRole.split('%').join(' ')
            if (!msg.guild.roles.cache.find(role => role.name === mainRole)) return msg.reply('Given main role does not exist in this server. Auto-setup failed.')
            msg.reply('Main role set successfully.')
            //Set mute role
            let muteRole = args[3]
            if (!muteRole) return msg.reply('Please give the name of the mute role you would like to set as the new Mute role. Do note that any spaces should be replace with the % sign. Auto-setup failed.')
            muteRole = muteRole.split('%').join(' ')
            if (!msg.guild.roles.cache.find(role => role.name === muteRole)) return msg.reply('Given mute role does not exist in this server. Auto-setup failed.')
            msg.reply('Mute role set successfully.')
            //Set log channel
            let logChannelID = args[4]
            if (!logChannelID) return msg.reply('Please give the ID of the new log channel in this server. Auto-setup failed.')
            if (!msg.guild.channels.cache.get(logChannelID)) return msg.reply('Given log channel does not exist in this server. Auto-setup failed.')
            msg.reply(`Log Channel set to <#${logChannelID}> successfully.`)
            //Sending pr!ss current command embed
            msg.channel.send('Auto-setup complete! Triggering `pr!ss current` command to show all new current settings...')
            let newGuildData = guildData
            newGuildData.mainRole = mainRole
            newGuildData.muteRole = muteRole
            newGuildData.logChannel = logChannelID
            let ssCurrentEmbed = currentSettingsEmbed(msg, newGuildData)
            msg.channel.send(ssCurrentEmbed)
            return newGuildData
        } else if (ssParam == 'setdeletelogs') {
            let condition = args[2]
            if (!condition) return msg.reply('Please type either true (you want to have logs of deleted messages) or false (you do not want to have logs of deleted messages)')
            if (condition != "true" && condition != "false") return msg.reply('Please give a valid value (either true or false).')
            msg.reply(`Set deletelogs to ${condition} successfully!`)
            var allowsDeleting;
            if (condition == 'true') {
                allowsDeleting = true
            } else {
                allowsDeleting = false
            }
            let newGuildData = guildData
            newGuildData.allowsDeleting = allowsDeleting
            return newGuildData
        } else if (ssParam == 'create.suggest') {
            const channel = msg.guild.channels.cache.find(c => c.name === 'suggestions' || c.name === 'suggest' || c.name === 'recommendations')
            if (channel) {
                msg.reply(`I identified <#${channel.id}> as a suggestions channel. Create one anyway? *WARNING: This could cause conflicts when sending suggestion messages* (respond with yes or no, you have 10 seconds to respond.)`)
                const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                collector.on('collect', response => {
                    let responseAsString = response.toString()
                    let lowercasedResponse = responseAsString.toLowerCase()
                    if (lowercasedResponse === 'yes') {
                        msg.guild.channels.create('suggestions', { type: 'text', topic: 'Suggestions made by members to be democratically voted by all members in the server.' })
                            .catch(err => {
                                msg.reply('An error occurred in creating the channel. Please ensure I have Administrator permissions.')
                                console.log('Suggestions channel creation error: ' + err)
                            })
                        msg.reply('Suggestions channel created! Please do not rename this channel but you can change its permissions how ever you like.')
                        return guildData
                    } else if (lowercasedResponse === 'no') {
                        msg.reply('Channel creation aborted!')
                        return guildData
                    } else {
                        msg.reply('Invalid response, channel creation aborted.')
                        return guildData
                    }
                })
            } else {
                msg.guild.channels.create('suggestions', { type: 'text', topic: 'Suggestions made by members to be democratically voted by all members in the server.' })
                    .catch(err => {
                        msg.reply('An error occurred in creating the channel. Please ensure I have Administrator permissions.')
                        console.log('Suggestions channel creation error: ' + err)
                    });
                msg.reply('Suggestions channel created! Please do not rename this channel but you can change its permissions how ever you like.')
                return guildData
            }
        } else if (ssParam == 'ar') {
            let trueOrFalse = args[2]
            if (!trueOrFalse) return msg.reply('Please state whether you would like to enable (true) or disable (false) the AutoRoles system.')
            if (trueOrFalse == 'true') { trueOrFalse = true } else { trueOrFalse = false }
            var currentGuildData = guildData
            currentGuildData.autorolesEnabled = trueOrFalse
            if (trueOrFalse) {
                msg.reply('AutoRoles system enabled successfully!')
            } else {
                msg.reply('AutoRoles system disabled successfully!')
            }
            return currentGuildData
        } else if (ssParam == 'profanityfilter') {
            var trueOrFalse = args[2]
            if (!trueOrFalse) return msg.reply('Please state whether you would like to enable (true) or disable (false) the Profanity Filter system.')
            if (trueOrFalse == 'true') {
                trueOrFalse = true
            } else if (trueOrFalse == 'false') {
                trueOrFalse = false
            } else {
                msg.reply('Invalid response. Only \`true\` and \`false\` are accepted.')
                return
            }
            var currentGuildData = guildData
            currentGuildData.giProfanityFilterEnabled = trueOrFalse
            msg.reply(`Set the Profanity Filter system\'s status to \`${trueOrFalse}\` successfully`)
            return currentGuildData
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