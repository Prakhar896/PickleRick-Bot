// Below are libraries the EL might or might not need
const Discord = require('discord.js');
const ms = require("ms");
const axios = require('axios');

module.exports = {
    name: 'guildMemberAdd',
    description: 'This EL listens for new members who join a server',
    async execute(guildMember, guilds) {
        var roleString;
        for (guildData of guilds) {
            if (guildData.id == guildMember.guild.id) {
                if (guildData.autorolesEnabled == true) {
                    if (!guildData.mainRole) return guildMember.guild.systemChannel.send(`An error (could not find main role) occurred in adding the main role to the new member ${guildMember.user.tag}. Please set the main role again using \`${Prefix}ss setmainrole <main role with spaces replaced with %>\``)
                    roleString = guildData.mainRole
                    var role = guildMember.guild.roles.cache.find(r => r.name === roleString)
                    if (!role) return guildMember.guild.systemChannel.send(`The role, \'${roleString}\', that has been set in my records does not exist. Failed to assign the role using AutoRoles. Please re-set the role using \`${Prefix}ss setmainrole <main role with spaces replaced with %>\``)
                    guildMember.roles.add(role)
                        .then(member => {
                            guildMember.guild.systemChannel.send(`Welcome <@${member.id}> to ${member.guild.name}!`)
                        })
                        .catch(err => {
                            guildMember.guild.systemChannel.send('An error occurred in adding the main role to the new member via the AutoRoles system. Please ensure that I have Administrator permissions.')
                            console.log('AutoRoles Error (Failed to add role to member): ' + err)
                            return
                        })
                    return
                } else {
                    return
                }
            }
        }
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