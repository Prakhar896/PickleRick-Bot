const Discord = require('discord.js')

module.exports = {
    name: 'setverlevel',
    description: 'This SS command changes the required verification level of the server.',
    execute(msg, args, guildData) {
        // SS Command Code
        let newLevel = args[2]
        if (!newLevel) return msg.reply('Please provide the new level of verfication you would like to set it to. Vaild levels are: NONE, LOW, MEDIUM, HIGH, VERY_HIGH. For more info, type \'pr!ss setverlevel help\'')
        if (newLevel != 'NONE' && newLevel != 'LOW' && newLevel != 'MEDIUM' && newLevel != 'HIGH' && newLevel != 'VERY_HIGH' && newLevel != 'help') return msg.reply('Invalid level. Please type pr!ss setverlevel help to find out about vaild verification level types.')
        if (newLevel == 'help') {
            let verHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Server Settings: Set Verification Level Help')
                .addField('Vaild Levels', '**Listed below are valid verification levels which you can set in this server.**')
                .addField('NONE', 'Members are *unrestricted* and cant send messages or make DMs without any requirements')
                .addField('LOW', 'Members need to have a verified email on their Discord account')
                .addField('MEDIUM', 'Members need to be registered on Discord for longer than 5 minutes')
                .addField('HIGH', 'Members need to be a member of this server for longer than 10 minutes')
                .addField('VERY_HIGH', 'Members need to have a verified phone on their Discord account')
                .setThumbnail('https://safety.discord.com/hc/article_attachments/360058713432/mceclip0.png')
                .setFooter('All levels are case-sensitive')
            msg.channel.send(verHelpEmbed)
            msg.channel.send('For additional information on verification levels, check out the official Discord support page: https://support.discord.com/hc/en-us/articles/216679607-What-are-Verification-Levels-#:~:text=Medium%20server%20verification%20settings%20mean,your%20glory%20in%20the%20chat.')
        } else {
            let currentVerLevel = msg.guild.verificationLevel
            msg.guild.setVerificationLevel(newLevel, `${msg.author.tag} requested to change the verification level in #${msg.channel.name} to ${newLevel}`)
                .catch(err => {
                    msg.reply('Failed to set the verification level. Please ensure that I have Administrator permissions.')
                    console.log('Server Setting SetVerificationLevel Error: ' + err)
                    return
                })
            msg.reply(`Set verification level of this server to ${newLevel} successfully.`)
            msg.guild.channels.cache.get(guildData.logChannel).send(`${msg.author.tag} set the verification level of this server from ${currentVerLevel} to ${newLevel}`)
        }
    }
}