require('dotenv').config();

const Discord = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]});

let sultansResource = createAudioResource(process.env.RESOURCE_ROUTE);
let audioPlayer = createAudioPlayer();
let connection = null;
let voiceChannel = null;
let subscription = null;
let playerStatus = null;

client.on('ready', () => {
    console.log('SoSBot is online');
});

//#region life cycle methods
// audioPlayer.on(AudioPlayerStatus.Playing, () => {
//     console.log("Audio Player is Playing");
// });

// audioPlayer.on(AudioPlayerStatus.Paused, () => {
//     console.log("Audio Player is Paused");
// });

// audioPlayer.on(AudioPlayerStatus.Idle, () => {
//     console.log("Audio Player is Idling");
// });

// audioPlayer.on('error', error => {
//     console.log('Error: ', error.message, ' with track ', error.resource.metadata.title);
// })
//#endregion

client.on('messageCreate', (message) => {
    switch (message.content) {
        case COMMAND.PLAY:
            const textChannel = client.channels.cache.get(message.channelId);
            voiceChannel = message.member.voice.channel; 

            if (!voiceChannel) {
                textChannel.send("Please join a Voice Channel to play Sultans of Swing.");
                return;
            }

            if (!connection) {
                connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator
                });

                subscription = connection.subscribe(audioPlayer);
            }

            if (playerStatus === "paused") {
                audioPlayer.unpause();
            } else {
                sultansResource = createAudioResource(process.env.RESOURCE_ROUTE);
                
                if (playerStatus !== "playing") {
                    audioPlayer.play(sultansResource);
                    textChannel.send('Playing Sultans of Swing for Jordan');
                }
            }
            playerStatus = "playing";
            break;
        case COMMAND.STOP:
            audioPlayer.stop();
            playerStatus = "stopped";
            break;
        case COMMAND.PAUSE:
            audioPlayer.pause();
            playerStatus = "paused";
            break;
        case COMMAND.CONTINUE:
            audioPlayer.unpause();
            playerStatus = "playing";
            break;
        case COMMAND.LEAVE:
            getVoiceConnection(voiceChannel.guild.id).destroy();
            connection = null;
            playerStatus = "stopped";
            break;
        default:
            break;
    }
});

const COMMAND = {
    PLAY: '/play',
    STOP: '/stop',
    PAUSE: '/pause',
    CONTINUE: '/continue',
    LEAVE: '/leave',
}

client.login(process.env.DISCORD_TOKEN);