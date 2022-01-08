// Below are libraries the EL might or might not need
const Discord = require('discord.js');
const ms = require("ms");
const axios = require('axios');

module.exports = {
    name: 'guildCreate',
    description: 'This EL listens for when the bot joins a guild',
    async execute(guild, localGuilds) {
        var guilds = localGuilds
        guilds.push({ id: guild.id, name: guild.name, logChannel: undefined, mainRole: '', muteRole: '', allowsDeleting: false, autorolesEnabled: false, giProfanityFilterEnabled: false })
        console.log('Joined guild: ' + guild.name)
        guild.systemChannel.send('Hey there! Thanks for addding me! To get started, run \`pr!ss help\` to find out the different mod commands and settings for this bot.')
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