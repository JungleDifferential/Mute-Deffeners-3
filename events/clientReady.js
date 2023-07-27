const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} Reporting for duty`);
        console.log(`THE GOAT IS BACK`);
    }
};