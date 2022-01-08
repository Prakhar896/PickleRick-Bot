// Below are libraries the EL might or might not need
const Discord = require('discord.js');
const ms = require("ms");
const axios = require('axios');

module.exports = {
    name: 'ready',
    description: 'This EL listens for when the bot connects to Discord Servers',
    async execute(bot, guildInvites, localGuilds) {
        var guilds = localGuilds
        console.log('The bot is online :).');
        bot.user.setActivity(`${Prefix}help`)
        bot.guilds.cache.forEach(guild => {
            //Invites
            guild.fetchInvites()
                .then(invites => {
                    guildInvites.set(guild.id, invites)
                })
                .catch(err => {
                    console.log('Fetching Invites Error: ' + err)
                })
            //Setting guilds and their info
            guilds.push({ id: guild.id, name: guild.name, logChannel: undefined, mainRole: '', muteRole: '', allowsDeleting: false, autorolesEnabled: false, giProfanityFilterEnabled: false })
        })
        let backEndChannel = bot.guilds.cache.get('805723501544603658').channels.cache.get('805733098297360406')
        backEndChannel.send('Would you like to autoset guild data to custom guilds?')
        //collector, for now, just autosets by itself
        var index = 0
        for (const guildData of guilds) {
            if (guildData.id == '773172065263943701') {
                //Smart People Server
                guilds[index].logChannel = '773172065263943704'
                guilds[index].mainRole = 'member'
                guilds[index].muteRole = 'dood is shut'
                guilds[index].allowsDeleting = true
                guilds[index].autorolesEnabled = true
            } else if (guildData.id == '780685961079685120') {
                //Ngee ann's maga party
                guilds[index].logChannel = '804692091724496907'
                guilds[index].mainRole = ''
                guilds[index].muteRole = ''
                guilds[index].allowsDeleting = false
                guilds[index].autorolesEnabled = false
                guilds[index].giProfanityFilterEnabled = true
            } else if (guildData.id == '807599800379768862') {
                //3r4, discord's better than whatsapp
                guilds[index].logChannel = '807615806988746783'
                guilds[index].mainRole = 'verified'
                guilds[index].muteRole = 'muted'
                guilds[index].allowsDeleting = true
                guilds[index].autorolesEnabled = true
                guilds[index].giProfanityFilterEnabled = true
            } else if (guildData.id == '696270592135135242') {
                //NASS Robotics
                guilds[index].logChannel = '812321866923376670'
                guilds[index].mainRole = 'Robotics Club Members'
                guilds[index].muteRole = 'shut'
                guilds[index].allowsDeleting = true
                guilds[index].autorolesEnabled = true
            } else if (guildData.id == '805723501544603658') {
                //Backend Server
                guilds[index].logChannel = '805733098297360406'
                guilds[index].mainRole = 'ma homie'
                guilds[index].muteRole = 'stfu'
                guilds[index].allowsDeleting = true
                guilds[index].autorolesEnabled = true
                guilds[index].giProfanityFilterEnabled = true
            } else if (guildData.id == '815050446766080040') {
                //Running Server
                guilds[index].logChannel = '815094333799006218'
                guilds[index].mainRole = 'member'
                guilds[index].allowsDeleting = true
                guilds[index].autorolesEnabled = false
            } else if (guildData.id == '814661841451483166') {
                // The Study Corner Server
                guilds[index].logChannel = '816277234599985163'
                guilds[index].mainRole = 'Member'
                guilds[index].muteRole = 'Muted'
                guilds[index].allowsDeleting = true
                guilds[index].autorolesEnabled = true
            } else if (guildData.id == '816517340190736424') {
                // meme founders gang server
                guilds[index].logChannel = '816581576980693004'
                guilds[index].mainRole = 'employee'
                guilds[index].muteRole = 'shut up'
                guilds[index].allowsDeleting = true
                guilds[index].autorolesEnabled = true
            } else if (guildData.id == '836808479099453460') {
                // stumble gamers server
                guilds[index].logChannel = '836962402796306472'
                guilds[index].mainRole = 'admin'
                guilds[index].allowsDeleting = true
                guilds[index].autorolesEnabled = true
            } else if (guildData.id == '853148400693805117') {
                //nickels server
                guilds[index].logChannel = '853150722317484042'
                guilds[index].mainRole = 'nickeler'
                guilds[index].muteRole = 'bad boi'
                guilds[index].allowsDeleting = true
                guilds[index].autorolesEnabled = true
                guilds[index].giProfanityFilterEnabled = true
            } else if (guildData.id == "909686440525459536") {
                guilds[index].logChannel = '910002422301212692'
                guilds[index].mainRole = 'man is alright'
            }
            index += 1
        }
        console.log(guilds)
        return [guildInvites, guilds]
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