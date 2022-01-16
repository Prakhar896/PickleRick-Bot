const Discord = require('discord.js')
const miscFunctions = require('../../miscFunctions')

module.exports = {
    name: 'autosetup',
    description: "This SS command allows you to quickly setup some server information so you are ready to instantly start using the bot!",
    async execute(msg, args, guildData, currentSettingsEmbed) {
        // SS Command Code
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
    }
}