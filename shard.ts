//Sharding
import { ShardingManager, Shard } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const manager = new ShardingManager("./index.ts", { token : process.env.DISCORD_TOKEN });

manager.on("shardCreate", (shard : Shard) => {
    console.log(`Launched shard ${shard.id}`);
})

manager.spawn();
