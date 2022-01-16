const Discord = require('discord.js')

module.exports = {
    name: 'setname',
    description: 'This SS command changes the name of the server.',
    execute(msg, args, guildData) {
        // SS Command Code
        let channelID = args[2]
        if (!channelID) return msg.reply('Please give the ID of the channel you would like to set as the new Rules Channel.')
        if (!msg.guild.channels.cache.get(channelID)) return msg.reply('That channel does not exist in this server.')
        let currentRulesChannel = msg.guild.rulesChannelID
        msg.guild.setRulesChannel(channelID, `${msg.author.tag} requested to change it to #${msg.guild.channels.cache.get(channelID).name} in #${msg.channel.name}`)
            .catch(err => {
                msg.reply('Failed to set the rules channel. Ensure that I have Administrator permissions.')
                console.log('Server Setting SetRulesChannel Error: ' + err)
                return
            })
        msg.reply(`Set new rules channel as <#${channelID}> successfully.`)
        msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} set the rules channel in this server from <#${currentRulesChannel}> to <#${channelID}> in <#${msg.channel.id}>`)
    }
}