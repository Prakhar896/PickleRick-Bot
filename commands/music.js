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
const ytdl = require('ytdl-core')
const ytSearch = require('yt-search');

module.exports = {
    name: 'music',
    description: 'Used for playing music using this bot in a voice channel',
    async execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        // if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (initiatespam) in #${msg.channel.name}`))
        let musicParam = args[1]
        if (!musicParam) return msg.reply('Please specify whether you want to play or stop music. Type pr!music help for more information.')
        if (musicParam != 'play' && musicParam != 'stop' && musicParam != "help") return msg.reply('Invalid request. Vaild requests include: play, stop and help. Type pr!music help for help.')
        if (musicParam == 'play') {
            const voiceChannel = msg.member.voice.channel;
            if (!voiceChannel) return msg.reply('Please join a voice channel to use this bot!')
            const permissions = voiceChannel.permissionsFor(msg.client.user)
            if (!permissions.has('CONNECT')) return msg.reply('You do not have permissions to Connect to a voice channel. Please contact the server mods for assistance.')
            if (!permissions.has('SPEAK')) return msg.reply('You do not have permissions to Speak in a voice channel. Please contact the server mods for assistance.')
            let query = msg.content.slice(14)
            if (!query) return msg.reply('Please give the search query or url. Type pr!music help for help.')
            
            const validURL = (str) =>{
                var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
                if(!regex.test(str)){
                    return false;
                } else {
                    return true;
                }
            }

            if (validURL(query)) {
                const connection = await voiceChannel.join()
                const stream = ytdl(query, {filter: 'audioonly'})
                connection.play(stream, {seek: 0, volume: 1})
                .on('finish', async () => {
                    await voiceChannel.leave()
                    msg.channel.send('Music ended. Left Voice Channel.')
                })
                await msg.reply(`:thumbsup: Playing URL in *${voiceChannel.name}* now!`)
                return
            }

            const connection = await voiceChannel.join()
            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query)
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await videoFinder(query)
            if (video) {
                const stream = ytdl(video.url, {filter: 'audioonly'});
                connection.play(stream, {seek: 0, volume: 1})
                .on('finish', () => {
                    voiceChannel.leave()
                    msg.channel.send(`Finished ***${video.title}***. Left voice channel *${voiceChannel.name}*.`)
                })
                await msg.channel.send(`:thumbsup: Playing ***${video.title}*** in *${voiceChannel.name}* now! URL: ${video.url}`)
            } else {
                msg.reply('Could not find video based on keywords. Try having more generic keywords.')
                return
            }

        } else if (musicParam == 'stop') {
            const voiceChannel = msg.member.voice.channel;
            if (!voiceChannel) return msg.reply('Please join a voice channel to stop the music!')
            await voiceChannel.leave()
            await msg.channel.send(`Left channel *${voiceChannel.name}*!`)
        } else if (musicParam == 'help') {
            let musicHelpEmbed = new Discord.MessageEmbed()
            .setTitle('Music Command Help')
            .addField('Format', 'pr!music play <query>, pr!music stop')
            .addField('pr!music play <query>', 'This command searches youtube with your given keywords (note that these need not be separated with the % sign, unlike most commands of this bot) and plays the media in a voice channel.')
            .addField('pr!music stop', 'Stop the music in the voice channel and leaves the channel.')
            .addField('Upon finishing...', 'The bot will leave the voice channel if the media has played finishing.')
            msg.channel.send(musicHelpEmbed)
        }
        return
    }
}