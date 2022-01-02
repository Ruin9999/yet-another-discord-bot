const { SlashCommandBuilder } = require("@discordjs/builders");
let loop = false;

async function handleAudio(interaction, client) {
    const subcommand = interaction.options.getSubcommand();

    switch(subcommand) {
        case "play":
            await Play(interaction, client);
            break;
        case "stop":
            await Stop(interaction, client);
            break;
        case "skip":
            await Skip(interaction, client);
            break;
        case "pause":
            await Pause(interaction, client);
            break;
        case "resume":
            await Resume(interaction, client);
            break;
        case "loop": 
            await ToggleRepeat(interaction, client);
            break;
        case "volume": 
            await SetVolume(interaction, client);
            break;
        case "clear":
            await Clear(interaction, client);
            break;
        case "nowPlaying": 
            await NowPlaying(interaction, client);
            break;
        case "queue":
            await GetQueue(interaction, client);
            break;
        default:
            await Play(interaction, client);
            break;
    }
    
}

async function Play(interaction, client) {
    const link = interaction.options.getString("query")
    let queue = client.player.createQueue(interaction.guild.id);
    await queue.join(interaction.member.voice.channel);
    let song = await queue.playlist(link)
        .catch(err => {
            if(!guildQueue) queue.stop();
        })

    await interaction.editReply(`Starting the music...`);
}

async function Stop(interaction, client) {

}

async function Skip(interaction, client) {

}

async function Pause(interaction, client) {

}

async function Resume(interaction, client) {

}

async function ToggleRepeat(interaction, client) {

}

async function Clear(interaction, client) {

}

async function NowPlaying(interaction, client) {

}

async function GetQueue(interaction, client) {
    
}

/* 
    play, stop, skip, pause, resume, loop, volume, clear, nowPlaying, queue
*/
module.exports = {
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("All music related commands")
        .addSubcommand(subcommand => {  //Play
            return subcommand.setName("play")
                .setDescription("Plays a track.")
                .addStringOption(option => {
                    return option.setName("query")
                        .setDescription("Link to track to play.")
                        .setRequired(true);
                })
        })
        .addSubcommand(subcommand => {  //Stop
            return subcommand.setName("stop")
                .setDescription("Stops playing");
        })
        .addSubcommand(subcommand => { //Skip
            return subcommand.setName("skip")
                .setDescription("Skips the track.");
        })
        .addSubcommand(subcommand => { //Loop
            return subcommand.setName("loop")
                .setDescription("Toggles if the track should loop or not.");
        })
        .addSubcommand(subcommand => {  //Volume
            return subcommand.setName("volume")
                .setDescription("Sets the track volume.")
                .addIntegerOption(option => {
                    return option.setName("volume")
                        .setDescription("Volume level.")
                        .setRequired(true);
                })
        })
        .addSubcommand(subcommand => {  //Clear
            return subcommand.setName("clear")
                .setDescription("Clears the current queue.");
        })
        .addSubcommand(subcommand => {  //Now Playing
            return subcommand.setName("nowplaying")
                .setDescription("Returns the current track name.");
        })
        .addSubcommand(subcommand => {  //Queue
            return subcommand.setName("queue")
                .setDescription("Returns the track list.");
        })
        .addSubcommand(subcommand => {  //Pause
            return subcommand.setName("pause")
                .setDescription("Pauses playing.");
        })
        .addSubcommand(subcommand => {  //Resume
            return subcommand.setName("resume")
                .setDescription("Resumes playing.");
        }),
    async execute(interaction, client) {
        await handleAudio(interaction, client);
    }
}
