import { botData } from '../main';
import { BaseInteraction, Events } from "discord.js";

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction: BaseInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const command = botData.commands.get(interaction.commandName);

        if (command === null) {
            console.error(`ERROR: Command ${interaction.commandName} does not exist`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I couldn\'t get that command to work 💀', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I couldn\'t get that command to work 💀', ephemeral: true });
            }
        }
    }
};