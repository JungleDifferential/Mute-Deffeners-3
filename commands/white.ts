import { CommandInteraction, GuildMemberRoleManager, SlashCommandBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('white')
        .setDescription('checks if you are white!'),
    async execute(interaction: CommandInteraction) {
        if (interaction.member === null) {
            console.log("somehow the member was null for white command ????");
            return;
        }

        const roles = interaction.member.roles;
        if (roles instanceof GuildMemberRoleManager && roles.cache.has('921904281530015744')) {
            await interaction.reply('Yes');
            await interaction.followUp('+ ratio bozo 💀\n');
            return;
        }
        await interaction.reply('no 😁');
    },
};