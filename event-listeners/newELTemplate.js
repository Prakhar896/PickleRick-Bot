// Below are libraries the EL might or might not need
const Discord = require('discord.js');
const ms = require("ms");
const axios = require('axios');

module.exports = {
    name: '',
    description: '',
    async execute() {

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