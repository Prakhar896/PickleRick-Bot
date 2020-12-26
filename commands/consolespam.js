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
    name: 'lullyspamyconsole',
    description: 'This is a random command only for me to use, no one will know this command. :)',
    execute(msg, args, logChannel) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        // if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.').then(msg.guild.channels.cache.get(logChannel).send(`${msg.author.tag} used the mod-only command (initiatespam) in #${msg.channel.name}`))
        setInterval(() => {
            let scenario = Math.ceil(Math.random() * 10)
            if (scenario == 1) {
                console.log('Accessing servers. Importing Binary Libraries.')
                console.log('=========')
                console.log('Downloading http post files.')
                console.log('=========')
                console.log('Processing JavaScript files. Embedding Silk Touch 2.')
                console.log('=========')
            } else if (scenario == 2) {
                console.log('Jumping to fire network A.')
                console.log('=========')
                console.log('Fibre optic route connection to server ID: 12264833043 Failed. Rerouting to SingTel servers.')
                console.log('=========')
                console.log('Google server hack attempt 3201 failed. Rejected by system with error code: 5524.')
                console.log('=========')
            } else if (scenario == 3) {
                console.log('Optical Google Stadia request to url-encode-decode library successful. Entering south port in New Mexico.')
                console.log('=========')
                console.log('Executing npm.manage command. Command to bypass all security systems and get coffee.')
                console.log('=========')
                console.log('Running data virus scan. All libraries synced with codeQL enabled repository on https://github.com.')
                console.log('=========')
            } else if (scenario == 4) {
                console.log('Securing website with https. Security check 4631 failed. VIRUS M312 DETECTED.')
                console.log('=========')
                console.log('ERR: PROCESS.ERROR, FILE_NAME: SUPERHACK>JS; ALL SYSTEMS FAILING.')
                console.log('ERR: PROCESS.ERROR, FILE_NAME: SUPERHACK>JS; ALL SYSTEMS FAILING.')
                console.log('ERR: PROCESS.ERROR, FILE_NAME: SUPERHACK>JS; ALL SYSTEMS FAILING.')
                console.log('ERR: PROCESS.ERROR, FILE_NAME: SUPERHACK>JS; ALL SYSTEMS FAILING.')
                console.log('ERR: PROCESS.ERROR, FILE_NAME: SUPERHACK>JS; ALL SYSTEMS FAILING.')
                console.log('ERR: PROCESS.ERROR, FILE_NAME: SUPERHACK>JS; ALL SYSTEMS FAILING.')
                console.log('=========')
            } else if (scenario == 5) {
                console.log('SYSTEM DATA REPATCH FILES ENABLED.')
                console.log('=========')
                console.log('All system ports disable including localhost:8000, Disabling SafeEntry procedures.')
                console.log('=========')
                console.log('Installing Firewalls. System breach Code RED initiated.')
                console.log('=========')
                console.log('All patch-up packs installed and shielding. Activiating licenses.')
                console.log('=========')
            } else if (scenario == 6) {
                console.log('System re-patch enabled. All systems online.')
                console.log('=========')
                console.log('Accessing proxy server datapoint with data-cahce code: 5542.')
                console.log('=========')
                console.log('Bot commands are online. Waiting for request at https://discordapp.com')
                console.log('=========')
                console.log('Breaching medium.com with 72 data packs. All data packs passed seurity and functionality checks.')
                console.log('=========')
            } else if (scenario == 7) {
                console.log('Traceroute to medium.com FAILED. 64 data packs deinstantiated. All system failing.')
                console.log('=========')
                console.log('42 ports waxed. Trying to reconfigure system management settings.')
                console.log('=========')
                console.log('Requesting information security at OAuth2@AWS.amazonsecure.discordapp.com. Reinforcements initialising.')
                console.log('=========')
            } else if (scenario == 8) {
                console.log('System neuroport activated. Nuclues deactivating and neutralising all cyberpsycho threats.')
                console.log('=========')
                console.log('Requesting code ERR landing permission at port 128 on google.com server.')
                console.log('=========')
                console.log('Authentication passed. Data access given.')
                console.log('=========')
                console.log('OneDrive.com interference detected. Scanning and tracerouting Internet cyberspace pathways.')
                console.log('=========')
                console.log('18008832832442039823057821 bits of data being sent via pathway 3268. System overload detected. Stopping server contact.')
                console.log('=========')
            } else if (scenario == 9) {
                console.log('System pathways secure.')
                console.log('=========')
                console.log('Rerouting server connections via proxy server with DNS 154.918.012.6 in South Africa via Japan.')
                console.log('=========')
                console.log('Reroute successful. CodeQL analysis checked.')
                console.log('=========')
            } else if (scenario == 10) {
                console.log('All systems online and functional.')
                console.log('=========')
                console.log('Updating log status online at heroku.cybernet@botspace.secure with current http process updates.')
                console.log('=========')
                console.log('Server log initiated. Raid initiated. Hack successful!')
                console.log('=========')
            }
        }, 500)
        
        return
    }
}