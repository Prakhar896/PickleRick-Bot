const Discord = require('discord.js')

module.exports = {
    name: 'setmainrole',
    description: 'This SS command changes the server\'s main role in the PickleRick database.',
    async execute(msg, args, guildData) {
        // SS Command Code
        let mainRole = args[2]
        if (!mainRole) return msg.reply('Please give the name of the main role you would like to set as the new Main role. Do note that any spaces should be replace with the % sign.')
        mainRole = mainRole.split('%').join(' ')
        if (!msg.guild.roles.cache.find(role => role.name === mainRole)) return msg.reply('That role does not exist in this server.')
        msg.reply('Main role set successfully.')
        let newGuildData = guildData
        newGuildData.mainRole = mainRole
        return newGuildData
    }
}