## PickleRick-Bot
# Description
This is a Discord bot that I made for any Discord server and has features from moderation to fun google images and game stats.

# Contributors
- Prakhar Trivedi, public email: prakh0706@outlook.com

# Usage

(Works only if you have an application with a bot setup at the [Discord Developer Portal](https://discord.com/developers)

- Download/Fork this repository.
- Go to [index.js](https://github.com/Prakhar896/PickleRick-Bot/blob/main/index.js) and update the 'token' variable at line 39 to your bot's token.
- Additionally, this bot requires a [FortniteAPI](https://fortnite-api.com) API Key, so, get one [here](https://dash.fortnite-api.com/) and update the variable at line 43 in [index.js](https://github.com/Prakhar896/PickleRick-Bot/blob/main/index.js) with your API key
- Go to a [Discord Bot Permissions Calculator](https://discordapi.com/permissions.html#8) and enter your [Discord application's Client ID](https://discord.com/developers) **Do not change the permissions as the bot requires Admin permissions to function**
- Click the link provided in the calculator and add the bot to a server.
- On your computer, open up Terminal/Command prompt and 'cd' into the folder and type 'node .' *You must have [node.js](https://nodejs.org) installed for this command to work*
- You should see the bot become active on the server.

Do pr!botinit <server's log channel id> to initialise the bot and set the channel where the bot will send logs as you use the commands **This step is required**.
pr! is the default prefix of the bot. Do pr!setprefix <prefix> if you want to choose your own prefix.

To find out more about the bot, do pr!modhelp (moderator-only command) or pr!help.

# Features
1) Message Clearing: pr!clear 50...
2) Finding out information about members: pr!minfo @...
3) Bot Info: pr!info
4) Help (pr!help) and moderator help (pr!modhelp)
5) Mute: pr!mute @... 10s
6) Poll: pr!poll (channel ID where poll is to be sent) do you like pancakes?
7) Clear all messages in channel: pr!clear-all 
8) Setting prefix: pr!setprefix !
9) Bypass and unmute to bypass timer and unmute someone: pr!bypassandunmute @...
10) Channel info: pr!cinfo
11) Server Info: pr!sinfo
12) Random google images (default subject is: memes): pr!gi (subject (optional))
13) Minecraft server status: pr!mc (server IP)
12) Fortnite Game Details: 'pr!fn help' or 'pr!fn troubleshoot' if you are running into some issues
13) Coinflip Feature: pr!coinflip (heads or tails)
14) Kicking: pr!kick @...
15) Banning: pr!ban @...
15) Trivia: pr!trivia help
16) Change a user's nickname: pr!nick @... (new nickname)
17) Unban a banned user with an ID: pr!unban (user ID)
18) Create/Manage an invite (works only if you have Create Instant Invite permissions) : pr!inv 
19) Get a list of active invites: pr!invitelist
20) Perform a mathematical operation: pr!math (operation, e.g 5*10)
