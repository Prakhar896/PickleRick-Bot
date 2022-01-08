// Below are libraries the EL might or might not need
const Discord = require('discord.js');
const ms = require("ms");
const axios = require('axios');

module.exports = {
    name: 'inviteDelete',
    description: 'This EL listens for whenever an invite is deleted and updates the local copy of invites.',
    async execute(invite, localGuildInvites, bot) {
        //refresh invites list
        var guildInvites = localGuildInvites
        bot.guilds.cache.forEach(guild => {
            guild.fetchInvites()
                .then(invites => {
                    guildInvites.set(guild.id, invites)
                })
                .catch(err => { console.log(err) })
        })
        console.log(`Invite deleted: ${invite.url}`)
        return guildInvites
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