const Discord = require('discord.js')
const miscFunctions = require('../../miscFunctions')

module.exports = {
    name: 'setlogchannel',
    description: "This SS command changes the server's log channel in the PickleRick database. All log messages will be sent to this channel.",
    async execute(msg, args, guildData) {
        // SS Command Code
        let logChannelID = args[2]
        if (!logChannelID) return msg.reply('Please give the ID of the new log channel in this server.')
        if (!msg.guild.channels.cache.get(logChannelID)) return msg.reply('That channel does not exist in this server.')
        msg.reply(`Log Channel set to <#${logChannelID}> successfully.`)
        let newGuildData = guildData
        newGuildData.logChannel = logChannelID
        return newGuildData
    }
}