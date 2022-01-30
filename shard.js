"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Sharding
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const manager = new discord_js_1.ShardingManager("./index.ts", { token: process.env.DISCORD_TOKEN });
manager.on("shardCreate", (shard) => {
    console.log(`Launched shard ${shard.id}`);
});
manager.spawn();
