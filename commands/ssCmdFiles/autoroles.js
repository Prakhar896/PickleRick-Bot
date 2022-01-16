const Discord = require('discord.js')
const miscFunctions = require('../../miscFunctions')

module.exports = {
    name: 'autoroles',
    description: "This SS command allows a mod to enable/disable the AutoRoles system.",
    async execute(msg, args, guildData) {
        // SS Command Code
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
    }
}