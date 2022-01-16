const Discord = require('discord.js')

module.exports = {
    name: 'setname',
    description: 'This SS command changes the name of the server.',
    execute(msg, args, guildData) {
        // SS Command Code
        let newName = args[2]
        if (!newName) return msg.reply('Please give the new name of the server you want to change to. Ensure that you replace any spaces with the % sign.')
        newName = newName.split('%').join(' ')
        let currentServerName = msg.guild.name
        msg.guild.setName(newName, `${msg.author.tag} requested to changed the name in #${msg.channel.name}`)
            .catch(err => {
                msg.reply('An error occurred in changing the server\'s name. Please ensure that I have Administrator permissions')
                console.log('Server Setting SetServerName Error: ' + err)
                return
            })
        msg.channel.send('Server name successfully changed')
        msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} set the name of this server from ${currentServerName} to ${newName} in <#${msg.channel.id}>`)
    }
}