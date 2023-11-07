import { Client, Events } from "discord.js";

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client: Client) {
        if (client.user === null) {
            throw new Error("somehow client.user is null ???");
        }
        console.log(`${client.user.tag} Reporting for duty`);
        console.log(`THE GOAT IS BACK`);
    }
};