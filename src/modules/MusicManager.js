const {
    joinVoiceChannel,
    getVoiceConnection,
    createAudioResource,
    NoSubscriberBehavior,
    AudioPlayerStatus,
    StreamType,
    createAudioPlayer,
} = require("@discordjs/voice");

const ytdl = require("ytdl-core");
const YoutubeApi = require("simple-youtube-api");
const youtube = new YoutubeApi(process.env.YOUTUBE_API)

module.exports = {
    /**
     * Function to join voice channel
     * @param {message} message The instanciating message
     */
    join(message) {
        return joinVoiceChannel({
            channelId : message.member.voice.channel.id,
            guildId : message.channel.guild.id,
            adapterCreator : message.channel.guild.voiceAdapterCreator
        });
    },

    /**
     * Function to leave voice channel
     * @param {message} message The instanciating message
     * @returns false
     */
    leave(message) {
        const connection = getVoiceConnection(message.guild.id);
        if(!connection) return;
        else {
            message.client.queue.delete(message.guild.id);
            connection.destroy();
        }
    },
    
    /**
     * Function to pause the audio player
     * @param {message} message The instanciating message
     */
    pause(message) {
        //Get audio player
        const queueObject = message.client.queue.get(message.guild.id);
        if(!queueObject) return;
        else queueObject.player.pause();
    },

    /**
     * Function to unpause the audio player
     * @param {message} message The instancianting message
     */
    resume(message) {
        const queueObject = message.client.queue.get(message.guild.id);
        if(!queueObject) {
            return false;
        }
        module.exports.resume(message);
    },

    loop(message) {
        const queueObject = message.client.queue.get(message.guild.id);

        //Toggles between looping and not looping
        queueObject.loop = !queueObject.loop;
    },
    
    /**
     * Function to skip to the next audio track
     * @param {message} message The instanciating message
     * @returns true if queue is found, false otherwise
     */
    skip(message) {
        
        //Try get the queue
        const queueObject = message.client.queue.get(message.guild.id);
        if(!queueObject) return false;

        //Take audio track out of queue
        const nextAudio = queueObject.queue.shift();
        
        if(!nextAudio) {
            module.exports.leave(message);
            return true;
        }

        message.client.queue.set(message.guild.id, queueObject);

        const stream = ytdl(nextAudio, {filter : "audioonly"});
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        queueObject.player.play(resource);

        return true;
    },

    /**
     * Function to adds audio to queue
     * @param {message} message The instanciating message
     * @param {args} args The url/query array that we want to use
     */
    async play(message, args) {
        let url = args.toString();

        //Check if args is url or query.
        const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const isValidUrl = videoPattern.test(url);

        if(!isValidUrl) {
            
            //Search for video
            const res = await youtube.searchVideos(url, 1, {part : "id"});
            url = res[0].url;
        }

        //Check if player is already playing something.
        let queueObject = message.client.queue.get(message.guild.id);
        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        })

        if(!queueObject) {
            //Create new queueObject
            queueObject = {
                queue : [],
                player,
            }
            
            //Add url to queue
            queueObject.queue.push(url);
            message.client.queue.set(message.guild.id, queueObject);

            module.exports.playAudio(message);

        } else {

            //Check if player is playing or not
            if(queueObject.player.state.status !== AudioPlayerStatus.Idle) {

                //Add song to queue.
                const queueObject = message.client.queue.get(message.guild.id);
                queueObject.queue.push(url);
                message.client.queue.set(message.guild.id, queueObject);
            } else {

                //Add song to queue and play.
                queueObject.queue.push(url);
                message.client.queue.set(message.guild.id, queueObject);

                module.exports.playAudio(message);
            }
        }

        //Return song information
        const songInfo = await ytdl.getInfo(url);
        return songInfo;
    },

    /**
     * Function to try and play the next song.
     * @param {message} message The instanciating message
     */
    playAudio(message) {

        //Check if the bot is already in a voice channel
        let connection = getVoiceConnection(message.guild.id);
        if(!connection) connection = module.exports.join(message);

        //Get the respective queue if no more songs, leave vc
        const queueObject = message.client.queue.get(message.guild.id);
        if(queueObject.queue.length < 1) {
            module.exports.leave(message);
            return;
        }
        
        //Get next audio track and return the queue.
        const nextAudio = queueObject.queue.shift();
        message.client.queue.set(message.guild.id, queueObject);

        //Try and play audio
        try {
            const stream = ytdl(nextAudio, {filter : "audioonly"});
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            
            //Start the player and connect it to the connection
            queueObject.player.play(resource);
            connection.subscribe(queueObject.player);

            //Make player play next track once current once is over
            queueObject.player.on(AudioPlayerStatus.Idle, () => {
                
                //Check if we are looping
                if(queueObject.loop) {
                    //Add current song into the back of the queue
                    queueObject.queue.push(nextAudio);
                }

                module.exports.playAudio(message);
            })

            //Handle player errors
            queueObject.player.on("error", err => {
                console.log(err.message);
                module.exports.playAudio(message);
            })

        } catch (err) {
            console.log(err);
        }
    }
}