# PickleRick-Bot
## Description
This is a Discord bot that I made for any Discord server and has features from moderation to fun google images and game stats.

## Contributors
- Prakhar Trivedi, public email: prakh0706@outlook.com

## Usage

(Works only if you have an application with a bot setup at the [Discord Developer Portal](https://discord.com/developers)

- Download/Fork this repository.
- Go to [index.js](https://github.com/Prakhar896/PickleRick-Bot/blob/main/index.js) and update the 'token' variable at line 39 to your bot's token.
- Additionally, this bot requires a [FortniteAPI](https://fortnite-api.com) API Key, so, get one [here](https://dash.fortnite-api.com/) and update the variable at line 43 in [index.js](https://github.com/Prakhar896/PickleRick-Bot/blob/main/index.js) with your API key
- Go to a [Discord Bot Permissions Calculator](https://discordapi.com/permissions.html#8) and enter your [Discord application's Client ID](https://discord.com/developers) **Do not change the permissions as the bot requires Admin permissions to function**
- Click the link provided in the calculator and add the bot to a server.
- On your computer, open up Terminal/Command prompt and 'cd' into the folder and type 'node .' *You must have [node.js](https://nodejs.org) installed for this command to work*
- You should see the bot become active on the server.

**This step is required:** Do `pr!ss help` to find out the different admin commands for the bot. Please create a log channel and use `pr!ss setlogchannel <id of log channel>` to set the log channel. After this, you can use the bot as per normal. (you may choose to set a main and muted role as well...do `pr!ss help` for more information)

`pr!` is the default prefix of the bot. Do `pr!setprefix <prefix>` if you want to choose your own prefix.

To find out more about the bot, do pr!modhelp (moderator-only command) or pr!help.

## Features
1) Message Clearing: pr!clear 50...
2) Finding out information about members: pr!minfo @...
3) Bot Info: pr!info
4) Help (pr!help) and moderator help (pr!modhelp) [MOD]
5) Mute: pr!mute @... 10s [MOD]
6) Poll: pr!poll (channel ID where poll is to be sent) do you like pancakes? [MOD]
7) Clear all messages in channel: pr!clear-all [MOD]
8) Setting prefix: pr!setprefix ! [MOD]
9) Bypass and unmute to bypass timer and unmute someone: pr!bypassandunmute @... [MOD]
10) Channel info: pr!cinfo
11) Server Info: pr!sinfo
12) Random google images (default subject is: memes): pr!gi (subject (optional))
13) Minecraft server status: pr!mc (server IP)
14) Fortnite Game Details: 'pr!fn help' or 'pr!fn troubleshoot' if you are running into some issues
15) Coinflip Feature: pr!coinflip (heads or tails)
16) Kicking: pr!kick @... [MOD]
17) Banning: pr!ban @... [MOD]
18) Trivia: pr!trivia help
19) Change a user's nickname: pr!nick @... (new nickname) 
20) Unban a banned user with an ID: pr!unban (user ID) [MOD]
21) Create/Manage an invite: pr!inv [SPECIAL PERMISSIONS]
22) Get a list of active invites: pr!invitelist [MOD]
23) Perform a mathematical operation: pr!math (operation, e.g 5*10)
24) Change some server settings and bot settings: pr!ss help [MOD]
25) Lock a channel (prevent people from messaging in it): pr!lockchannel help [MOD]
26) Get information from Wikipedia: pr!wiki help
27) Listen to Music in a Voice Channel: pr!music help (temporarily disabled)
28) Delete Message Logs (Logs content of messages when they are deleted.): pr!ss setdeletelogs true/false [MOD]
29) Suggestions (suggest improvements to a server democratically): pr!suggest (your suggestion here)
30) Role Management (assign or unassign roles to members): 'pr!assign help' and 'pr!unassign help' [MOD]
31) Channel Creation (create text or voice channels with special customisations): pr!create help [MOD]
32) Link to All Features Webpage: pr!cmdlist
33) Get the Weather for any location: pr!weather (location name)

Commands tagged with [MOD] or [SPECIAL PERMISSIONS] work only if you are a moderator or if you have specific permissions.
