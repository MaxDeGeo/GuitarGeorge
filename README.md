# GuitarGeorge

## Installation

### 0. Install Node.js and npm: https://nodejs.org/en/download/

### 1. Clone Repository

Open up a bash terminal, navigate to desired folder destination, and type in `git clone <repo http url>`

### 2. Install Node Packages

Nagivate to the newly cloned repo folder in the bash terminal and type `npm i`

### 3. Add missing dependencies

Add a folder called **audio** in the root project folder where main.js is located. Inside the **Audio** folder, include the mp3 file of your choice.

Create a .env file in the root of the project, and include `DISCORD_TOKEN=<BOT TOKEN>`

### 4. Authorize and Generate Bot Token

To create the **BOT TOKEN** mentioned in step 3, go to https://discord.com/developers and sign in. Once connected, create a **New Application** and name it whatever you'd like. This will be the name of the bot on your server by default.
Once created, open up the created application on the developer portal and navigate to the **Bot** tab. Select **Add Bot** and confirm this choice. The page should now reveal more information. Select **Click to Reveal Token** button and copy that token.

With this new token, follow the text **DISCORD_TOKEN=** in the .env file with that token as is.

### 5. Add Audio File Route

In the .env file, add a second line to the document with this code `RESOURCE_ROUTE=<./audio/filename.mp3>` and replace filename.mp3 with filename and type.

### 6. Launch and Test

In a bash terminal, navigate to the root folder of the repository and type in `node .` or `node main.js` to launch the server for the bot.
To add the bot to a server, go to https://discordapi.com/permissions.html#549758959616, select the permissions to give to the bot, and copy the **Application ID** found under the **General Information** tab on Discord's Developer Portal for the Bot Application and paste it into the Client ID section for the OAuth URL Generator.
Copy the generated url and provide it to a Discord Server Bot manager to allow on a server.

### 7. Commands

**/play** - Bot joins Voice Channel of user who called it and starts playing audio source. Continues audio source if paused, and starts audio source if no audio source is playing.
<br />
**/stop** - Stops audio source, but bot remains in Voice Channel
<br />
**/pause** - Pauses audio source.
<br />
**/continue** - Continues audio source.
<br />
**/leave** - Removes bot from Voice Channel.
