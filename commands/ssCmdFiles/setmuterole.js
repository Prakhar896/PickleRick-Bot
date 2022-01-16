const Discord = require('discord.js')

module.exports = {
    name: 'setname',
    description: 'This SS command changes the name of the server.',
    async execute(msg, args, guildData) {
        // SS Command Code
        let muteRole = args[2]
        if (!muteRole) return msg.reply('Please give the name of the mute role you would like to set as the new Mute role. Do note that any spaces should be replace with the % sign.')
        muteRole = muteRole.split('%').join(' ')
        if (!msg.guild.roles.cache.find(role => role.name === muteRole)) return msg.reply('That role does not exist in this server.')
        msg.reply('Mute role set successfully.')
        let newGuildData = guildData
        newGuildData.muteRole = muteRole
        return newGuildData
    }
}