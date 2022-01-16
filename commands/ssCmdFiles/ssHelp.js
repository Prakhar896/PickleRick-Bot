const Discord = require('discord.js')
const miscFunctions = require('../../miscFunctions')

module.exports = {
    name: 'Server Settings Help',
    description: "This SS command sends an extremely packed help embed full of information on how to use this bot.",
    async execute(msg, args, guildData) {
        // SS Command Code
        let ssHelpEmbed = new Discord.MessageEmbed()
            .setTitle('Server Settings Help')
            .addField('NOTE:', 'This bot is quite complex to use and all information listed below will take a minute to take in. It is worth the time reading through all the help for newer servers using me! Enjoy using PickleRick!!!')
            .addField('pr!ss current', 'Shows all the current settings of the Discord server in an embed.', true)
            .addField('pr!ss setname <name>', 'Sets the new name of the Discord server.', true)
            .addField('pr!ss setsyschannel <channel ID>', 'Sets the the server\'s default system channel where all system messages such as new members joining are sent from the system.', true)
            .addField('pr!ss setruleschannel <channel ID>', 'Sets the system rules channel for people to go to check out your server\'s rules and guidelines. The rules channel will have a special book and tickmark icon to indicate it is a rules channel', true)
            .addField('pr!ss setverlevel <verification level>', 'Sets the verification level required to join the server. Get more information on this command using pr!ss setverlevel help', true)
            .addField('pr!ss setmainrole <main role name, with spaces replaced with %>', 'Sets the main role of the server in the bot\'s settings. This role, upon choice, will be used for muting people and also adding a role to new people who join the server, this, it is crucial to run this command when I join the server.', true)
            .addField('pr!ss setmuterole <mute role name, with spaces replaced with %', 'Sets the mute role of the server in the bot\'s settings. This role will be used by the bot to mute people. A mute role is a role that has disadvantaged permissions causing members to not be able to send messages and is used as a punishment by moderators for notorious members.', true)
            .addField('pr!ss setlogchannel <log channel ID>', 'Sets the log channel of the server in the bot. This allows the bot to log important changes or commands that have been executed in the log channel for Admins or Mods to later look back at if needed. This command is also pretty crucial and I recommend that every server have a log channel.', true)
            .addField('pr!ss autosetup <main role name, spaces replaced with %> <mute role name, spaces replaced with %> <log channel ID>', 'Runs an auto-setup command that quickly sets the bot\'s main role, mute role and log channel. The command is quite complexed but if you know and understand how to use it, it is pretty good to use, especially for new servers.')
            .addField('Spaces Replaced With % Formatting', 'In this bot, most commands have this style of formatting where spaces are replaced with the % sign, like pr!initiatespam hello%there 10 <channel ID>. This is to allow the bot to register commands quickly and properly and execute them as quickly as possible.', true)
            .addField('pr!ss setdeletelogs <true or false>', 'This setting allows you to control whether the bot should report the deletion of messages throughout the server to the log channel. true means you allow and false means you don\'t')
            .addField('pr!ss create.suggest', 'Creates a suggestion channel in the server for the pr!suggest command. Please do not rename this channel but you can change its permissions as you like.')
            .addField('pr!ss profanity filter <true | false>', 'Turn on or off a profanity filter on the search queries I search to mitigate explicit media being sent.')
            .addField('pr!ss ar <true | false>', 'Turn on or off the AutoRoles feature of the bot. This feature will automatically add the main role to new members who join the server.')
            .setFooter('Do pr!cmdlist to view the full list of commands that can be executed.')
        msg.channel.send(ssHelpEmbed)
    }
}