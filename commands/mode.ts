import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMemberRoleManager } from 'discord.js';
import { botData } from '../main';

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mode")
        .setDescription("change the mode of the bot to start moving mute/deffeners, or to take it easy on them")
        .addStringOption(option => 
            option.setName("mode")
                .setDescription("What mode you want me to be in ?")
                .setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction) {

        const roles = interaction.member?.roles;
        if (roles instanceof GuildMemberRoleManager && roles.cache.has("694260547570630706")) {
            await interaction.reply("Do they know.... :ICANT:");
            return;
        }
        
        const choice = interaction.options.getString("mode");
        if (choice == "mute" || choice == "deafen" || choice == "off") {
            botData.mode = choice;
            await interaction.reply(`mode is now ${botData.mode}`);
            return
        }

        await interaction.reply(`nice mode bozo`);
    }
}