// Below are libraries the EL might or might not need
const Discord = require('discord.js');
const ms = require("ms");
const axios = require('axios');

module.exports = {
    name: 'guildDelete',
    description: 'This EL listens for when the bot leaves a guild.',
    async execute(leftGuild, localGuilds) {
        var guilds = localGuilds
        let serverIndex = guilds.findIndex(guildData => guildData.id === leftGuild.id)
        if (serverIndex == -1 || serverIndex == undefined) return console.log('Fatal Guild Removing Error, Left Guild Data: ' + leftGuild)
        guilds.splice(serverIndex, 1)
        console.log('Left guild: ' + leftGuild.name)
        return guilds
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