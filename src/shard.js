const { ShardingManager } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const manager = new ShardingManager("./src/index.js", {token : process.env.DISCORD_TOKEN});

manager.on("shardCreate", (shard) => {
    console.log(`Launched Shard ${shard.id}`);
})

manager.spawn();