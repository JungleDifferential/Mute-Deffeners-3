const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('white')
        .setDescription('checks if you are white!'),
    async execute(interaction) {
        if (interaction.member.roles.cache.has('921904281530015744')) {
            await interaction.reply('Yes');
            await interaction.followUp('+ ratio 💀');
            return;
        }
        await interaction.reply('no 😁');
    },
};