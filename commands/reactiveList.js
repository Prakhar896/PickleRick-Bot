//these libraries may or may not be used in the command
const Discord = require('discord.js');
const ms = require("ms");
const http = require('https');
const mcUtil = require('minecraft-server-util');
const cheerio = require('cheerio');
const request = require('request');
const fortniteAPI = require('fortnite-api-com');
const triviaDB = require('triviadb')
const fs = require('fs')

module.exports = {
    name: 'reactiveList',
    description: 'This command creates a reactive list message that allows members of a server to participate in an event with a reaction',
    async execute(msg, args, guildData, Prefix, client, Discord, creatorBypassMode, rlMessagesList) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        if (msg.author.id == process.env.CREATOR_DISCORD_ID && creatorBypassMode == true) {
            // console.log("Bypassing admin authorisation due to creatorbypassmode being on...")
        } else {
            if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
                .then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (//command name) in #${msg.channel.name}`)
                    .catch(err => {
                        msg.reply('Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`pr!ss setlogchannel <id of log channel>\` to set the log channel.')
                        console.log("Error in logging to log channel: " + err)
                    }))
        }

        // actual code
        let channelHash = args[1]
        if (!channelHash) return msg.reply('Please provide a channel ID to create the reactive list in.')
        let channelID = channelIDExtractor(channelHash)
        if (channelHash == "current") { channelID = msg.channel.id } else if (channelHash == "help") {
            var helpEmbed = new Discord.MessageEmbed()
                .setTitle("Reactive Lists Help")
                .setColor("ORANGE")
                .addField("Usage", "`pr!rl #channel <Reactive List title here, spaces allowed>`")
                .addField("Example usage:", "`pr!rl #general Volunteer here to join the beach cleanup!")
                .setFooter("Tip: you can replace the #channel parameter with `current` and PickleRick will send the reactive message in the current channel you are messaging in. For e.g `pr!rl current Volunteer here to join the beach cleanup!`")

            msg.channel.send(helpEmbed)
            return
        }
        if (!msg.guild.channels.cache.get(channelID)) return msg.reply('Please provide a valid channel ID to create the reactive list in.')

        let rlHeader = args.slice(2).join(' ')
        if (!rlHeader) return msg.reply('Please provide a title for the reactive list.')

        let targetChannel = msg.guild.channels.cache.get(channelID)
        var rlMessageID = ""
        await targetChannel.send(`New Reactive List: ${rlHeader}\n`)
            .then(async rlMessage => {
                rlMessageID = rlMessage.id
                await rlMessage.react('🖐')
                    .catch(err => {
                        console.log(`Error in reacting to reactive list message: ${err}`)
                        msg.reply("Failed to react to the reactive list message. Please ensure that the bot has permissions to react to messages.")
                    })
                var successEmbed = new Discord.MessageEmbed()
                    .setDescription(`Reactive list created in <#${targetChannel.id}> with ID \`${rlMessageID}\`. Click [here](https://discord.com/channels/${msg.guild.id}/${targetChannel.id}/${rlMessageID}) to view the list.`)
                    .setColor("GREEN")
                await msg.channel.send(successEmbed)
                var newRlMessagesList = rlMessagesList
                newRlMessagesList.push(rlMessageID)
            })
            .catch(err => {
                console.log("Error in creating reactive list message: " + err)
                msg.reply('Failed to create reactive list message! Please try again!')
            })
        return { "newRLData": rlMessagesList }
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