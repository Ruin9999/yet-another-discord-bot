import Deployer from "../structures/Deployer";
import client from "../../index";
import IEvent from "../interfaces/IEvent";

const event : IEvent = {
    name: "ready",
    once: false,
    run() {
        const deployer = new Deployer(client, process.env.GUILD_ID);
        deployer.deploy();
        console.log("Bot is ready!");
    }
}

export default event;