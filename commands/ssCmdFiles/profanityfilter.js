const Discord = require('discord.js')
const miscFunctions = require('../../miscFunctions')

module.exports = {
    name: 'profanityfiler',
    description: "This SS command allows a mod to enable/disable the Google Images profanity blocker system.",
    async execute(msg, args, guildData) {
        // SS Command Code
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
}