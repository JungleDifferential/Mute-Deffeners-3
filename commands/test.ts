import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command to see if slash commands work properly'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply('working 👍');
    },
};