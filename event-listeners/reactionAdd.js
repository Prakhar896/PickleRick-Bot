// Below are libraries the EL might or might not need
const Discord = require('discord.js');
const ms = require("ms");
const axios = require('axios');

module.exports = {
    name: 'reactionAddEL',
    description: 'This is an event listener that listens for new message reactions.',
    async execute(reaction, user) {
        if (reaction.me) return
        if (reaction.emoji.name != "🖐") return
        for (var rlMessageID of rlMessagesList) {
            if (reaction.message.id === rlMessageID) {
                var messageText = reaction.message.content
                if (reaction.message.guild.member(user).nickname) {
                    messageText += `\n ${reaction.message.guild.member(user).nickname}`
                } else {
                    messageText += `\n ${user.username}`
                }
                reaction.message.edit(messageText)
                    .then(msg => {
                        console.log(`${msg.id} RL Message was updated with new reaction.`)
                    })
                    .catch(err => {
                        console.log(`Error in updating RL Message with ID ${rlMessageID}: ${err}`)
                        reaction.message.channel.send("There was an error in updating the RL Message that has the ID: " + rlMessageID + ". Please re-create the reactive list message.")
                    })
                break
            }
        }
    }
}