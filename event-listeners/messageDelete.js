// Below are libraries the EL might or might not need
const Discord = require('discord.js');
const ms = require("ms");
const axios = require('axios');

module.exports = {
    name: 'messageDelete',
    description: 'This EL listens for whenever a message is deleted in a server.',
    async execute(localGuilds, deletedMessage) {
        var guilds = localGuilds
        let serverIndex = guilds.findIndex(guildData => guildData.id === deletedMessage.guild.id)
        if (serverIndex == undefined || serverIndex == -1) return console.log(`Error in Getting Server Index when trying to log deleted message due to data error. Deleted Message: ${deletedMessage.content}, Guild ID and Name: ${deletedMessage.guild.id}, ${deletedMessage.guild.name}`)
        if (guilds[serverIndex].allowsDeleting == true) {
            deletedMessage.guild.channels.cache.get(guilds[serverIndex].logChannel).send(`${deletedMessage.author.tag} deleted a message with the content \`${deletedMessage.content}\` in <#${deletedMessage.channel.id}>`)
        }
        return
    }
}

//Collector template
// const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
// collector.on('collect', response => {

// })

function channelIDExtractor(channelHash) {
    if (channelHash == 'current') {
        return channelHash
    }
    let channelID = channelHash.slice(2, channelHash.length - 1)
    return channelID
}