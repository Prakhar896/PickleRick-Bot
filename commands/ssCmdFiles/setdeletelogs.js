const Discord = require('discord.js')
const miscFunctions = require('../../miscFunctions')

module.exports = {
    name: 'setdeletelogs',
    description: "This SS command allows an admin to enable/disable the Deleted message logging system.",
    async execute(msg, args, guildData) {
        // SS Command Code
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
    }
}