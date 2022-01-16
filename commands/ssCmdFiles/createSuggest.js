const Discord = require('discord.js')
const miscFunctions = require('../../miscFunctions')

module.exports = {
    name: 'createSuggest',
    description: "This SS command allows you to create a suggestions channel which can be used by members of a guild to make democractic suggestions.",
    async execute(msg, args, guildData) {
        // SS Command Code
        const channel = msg.guild.channels.cache.find(c => c.name === 'suggestions' || c.name === 'suggest' || c.name === 'recommendations')
        if (channel) {
            msg.reply(`I identified <#${channel.id}> as a suggestions channel. Create one anyway? *WARNING: This could cause conflicts when sending suggestion messages* (respond with yes or no, you have 10 seconds to respond.)`)
            const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
            collector.on('collect', response => {
                let responseAsString = response.toString()
                let lowercasedResponse = responseAsString.toLowerCase()
                if (lowercasedResponse === 'yes') {
                    msg.guild.channels.create('suggestions', { type: 'text', topic: 'Suggestions made by members to be democratically voted by all members in the server.' })
                        .catch(err => {
                            msg.reply('An error occurred in creating the channel. Please ensure I have Administrator permissions.')
                            console.log('Suggestions channel creation error: ' + err)
                        })
                    msg.reply('Suggestions channel created! Please do not rename this channel but you can change its permissions how ever you like.')
                    return guildData
                } else if (lowercasedResponse === 'no') {
                    msg.reply('Channel creation aborted!')
                    return guildData
                } else {
                    msg.reply('Invalid response, channel creation aborted.')
                    return guildData
                }
            })
        } else {
            msg.guild.channels.create('suggestions', { type: 'text', topic: 'Suggestions made by members to be democratically voted by all members in the server.' })
                .catch(err => {
                    msg.reply('An error occurred in creating the channel. Please ensure I have Administrator permissions.')
                    console.log('Suggestions channel creation error: ' + err)
                });
            msg.reply('Suggestions channel created! Please do not rename this channel but you can change its permissions how ever you like.')
            return guildData
        }
    }
}