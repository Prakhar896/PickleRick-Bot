const Discord = require('discord.js')

module.exports = {
    name: 'setsyschannel',
    description: 'This SS command changes the system channel of the server. All new member notifications will be sent to this channel.',
    execute(msg, args, guildData) {
        // SS Command Code
        let channelID = args[2]
        if (!channelID) return msg.reply('Please give the channel ID of the new system channel.')
        if (!msg.guild.channels.cache.get(channelID)) return msg.reply('That channel does not exist in this server.')
        let currentSystemChannel = msg.guild.systemChannelID
        msg.guild.setSystemChannel(channelID, `${msg.author.tag} requested to change the system channel in #${msg.channel.name}`)
            .catch(err => {
                msg.reply('An error occurred in changing the system channel. Please ensure that I have Administrator permissions.')
                console.log('Server Setting SetSystemChannel Error: ' + err)
                return
            })
        msg.reply(`System channel successfully changed to <#${channelID}>`)
        msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} set the system channel in this server from <#${currentSystemChannel}> to <#${channelID}> in <#${msg.channel.id}>`)
    }
}