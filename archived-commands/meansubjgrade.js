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
    name: 'Mean Subject Grade Calculator',
    description: 'Calculates the mean subject grade of a person, only works in 3R4 Discord',
    execute(msg, args, guildData, Prefix, client, Discord) {
        if (!msg.guild) return msg.reply('Please use this bot in a guild.')
        // admin check
        //if (!guildData.logChannel) return msg.reply('A log channel is required to be set up for this command to run.')
        // if (!msg.member.hasPermission('ADMINISTRATOR', true)) return msg.channel.send('This is a mod-only command. You do not have permissions to use this command. This action will be logged.')
        //.then(msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} used the mod-only command (//command name) in #${msg.channel.name}`)
        // .catch(err => {
        //     msg.reply(`Failed to log event to log channel. Please ensure that you have a log channel setup! Use \`${Prefix}ss setlogchannel <id of log channel>\` to set the log channel.`)
        // }))
        //3R4 discord check
        if (msg.guild.id != '807599800379768862' && msg.guild.id != '805723501544603658') return msg.reply('Sorry, this command is only available to specific servers.')
        //actual code
        if (args[1] == 'help') {
            let helpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for MSG Calculator')
                .setDescription('Command that allows you to calculate your Mean Subject Grade from all your exams.')
                .addField('How it works:', 'You will have to repeatedly type in the marks you have gotten as I prompt you to in the format {marks}/{outOf}, for e.g: 08/30 or 11/30.')
                .setFooter('NOTE: You must respond to the subject prompts within 10 seconds.')
                .setColor('GREEN');
            msg.channel.send(helpEmbed)
            return
        } else {
            msg.reply('Starting calculation...')
            var totalGotten = 0
            var totalOutOf = 0
            msg.reply('What are your marks for English?')
            //eng collecotr
            const engCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
            engCollector.on('collect', englishMarks => {
                var engArray = englishMarks.content.split('/')
                engCollector.stop()
                if (checkForVaildInput(engArray)) {
                    totalGotten += parseInt(engArray[0])
                    totalOutOf += parseInt(engArray[1])
                    //emaths collector
                    msg.reply('What are your marks for EMaths?')
                    const emathCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                    emathCollector.on('collect', emathMarks => {
                        var emathArray = emathMarks.content.split('/')
                        emathCollector.stop()
                        if (checkForVaildInput(emathArray)) {
                            totalGotten += parseInt(emathArray[0])
                            totalOutOf += parseInt(emathArray[1])
                            //amath collector
                            msg.reply('What are your marks for AMath?')
                            const amathCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                            amathCollector.on('collect', amathMarks => {
                                var amathArray = amathMarks.content.split('/')
                                amathCollector.stop()
                                if (checkForVaildInput(amathArray)) {
                                    totalGotten += parseInt(amathArray[0])
                                    totalOutOf += parseInt(amathArray[1])
                                    //pure phy collector
                                    msg.reply('What are your marks for Pure Physics?')
                                    const phyCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                                    phyCollector.on('collect', phyMarks => {
                                        var phyArray = phyMarks.content.split('/')
                                        phyCollector.stop()
                                        if (checkForVaildInput(phyArray)) {
                                            totalGotten += parseInt(phyArray[0])
                                            totalOutOf += parseInt(phyArray[1])
                                            //pure chem collector
                                            msg.reply('What are your marks for Pure Chemistry?')
                                            const chemCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                                            chemCollector.on('collect', chemMarks => {
                                                var chemArray = chemMarks.content.split('/')
                                                chemCollector.stop()
                                                if (checkForVaildInput(chemArray)) {
                                                    totalGotten += parseInt(chemArray[0])
                                                    totalOutOf += parseInt(chemArray[1])
                                                    //humanities collector
                                                    msg.reply('What are your marks for Humanities (EGeography/EHistory)?')
                                                    const humanitiesCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                                                    humanitiesCollector.on('collect', humanMarks => {
                                                        var humanArray = humanMarks.content.split('/')
                                                        humanitiesCollector.stop()
                                                        if (checkForVaildInput(humanArray)) {
                                                            totalGotten += parseInt(humanArray[0])
                                                            totalOutOf += parseInt(humanArray[1])
                                                            //social studies collector
                                                            msg.reply('What are your marks for Social Studies?')
                                                            const ssCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                                                            ssCollector.on('collect', ssMarks => {
                                                                var ssArray = ssMarks.content.split('/')
                                                                ssCollector.stop()
                                                                if (checkForVaildInput(ssArray)) {
                                                                    totalGotten += parseInt(ssArray[0])
                                                                    totalOutOf += parseInt(ssArray[1])
                                                                    //coursework collector, need to check if user has coursework
                                                                    msg.reply('What are your marks for Coursework Subjects (Computing, DNT, etc.)? If you do not take a coursework subject, type \`skip\`.')
                                                                    const cwCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                                                                    cwCollector.on('collect', cwMarks => {
                                                                        var cwArray = cwMarks.content.split('/')
                                                                        console.log(cwArray)
                                                                        cwCollector.stop()
                                                                        if (cwMarks.content == 'skip') {
                                                                            //mother tongue collector
                                                                            msg.reply('What are your marks for MTL (Chinese, Malay, Hindi etc.)?')
                                                                            const mtlCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                                                                            mtlCollector.on('collect', mtlMarks => {
                                                                                var mtlArray = mtlMarks.content.split('/')
                                                                                mtlCollector.stop()
                                                                                if (checkForVaildInput(mtlArray)) {
                                                                                    totalGotten += parseInt(mtlArray[0])
                                                                                    totalOutOf += parseInt(mtlArray[1])
                                                                                    //final calculation
                                                                                    var meansubjectgrade = ((parseFloat(totalGotten) / parseFloat(totalOutOf)) * 100).toPrecision(3)
                                                                                    msg.channel.send(`Your Mean Subject Grade is: **${meansubjectgrade} percent.**`)
                                                                                } else {
                                                                                    msg.reply(`Failed to get marks, please try again or type \`${Prefix}msg help\` for help.`)
                                                                                    return
                                                                                }
                                                                            })
                                                                        } else if (checkForVaildInput(cwArray)) {
                                                                            console.log('i have run')
                                                                            totalGotten += parseInt(cwArray[0])
                                                                            totalOutOf += parseInt(cwArray[1])
                                                                            //mother tongue collector
                                                                            msg.reply('What are your marks for MTL (Chinese, Malay, Hindi etc.)?')
                                                                            const mtlCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                                                                            mtlCollector.on('collect', mtlMarks => {
                                                                                var mtlArray = mtlMarks.content.split('/')
                                                                                mtlCollector.stop()
                                                                                if (checkForVaildInput(mtlArray)) {
                                                                                    totalGotten += parseInt(mtlArray[0])
                                                                                    totalOutOf += parseInt(mtlArray[1])
                                                                                    //final calculation
                                                                                    var meansubjectgrade = ((parseFloat(totalGotten) / parseFloat(totalOutOf)) * 100).toPrecision(3)
                                                                                    msg.channel.send(`Your Mean Subject Grade is: **${meansubjectgrade} percent.**`)
                                                                                } else {
                                                                                    msg.reply(`Failed to get marks, please try again or type \`${Prefix}msg help\` for help.`)
                                                                                    return
                                                                                }
                                                                            })
                                                                        } else {
                                                                            msg.reply(`Failed to get marks, please try again or type \`${Prefix}msg help\` for help.`)
                                                                            return
                                                                        }
                                                                    })
                                                                } else {
                                                                    msg.reply(`Failed to get marks, please try again or type \`${Prefix}msg help\` for help.`)
                                                                    return
                                                                }
                                                            })
                                                        } else {
                                                            msg.reply(`Failed to get marks, please try again or type \`${Prefix}msg help\` for help.`)
                                                            return
                                                        }
                                                    })
                                                } else {
                                                    msg.reply(`Failed to get marks, please try again or type \`${Prefix}msg help\` for help.`)
                                                    return
                                                }
                                            })
                                        } else {
                                            msg.reply(`Failed to get marks, please try again or type \`${Prefix}msg help\` for help.`)
                                            return
                                        }
                                    })
                                } else {
                                    msg.reply(`Failed to get marks, please try again or type \`${Prefix}msg help\` for help.`)
                                    return
                                }
                            })
                        } else {
                            msg.reply(`Failed to get marks, please try again or type \`${Prefix}msg help\` for help.`)
                            return
                        }
                    })
                } else {
                    msg.reply(`Failed to get marks, please try again or type \`${Prefix}msg help\` for help.`)
                    return
                }
            })
        }
        return
    }
}

function checkForVaildInput(marksArray) {
    if (marksArray.length == 2) {
        var gotten = parseInt(marksArray[0])
        var outOf = parseInt(marksArray[1])
        if (gotten <= outOf) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}