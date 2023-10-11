const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mode")
        .setDescription("change the mode of the bot to start moving mute/deffeners, or to take it easy on them")
        .addStringOption(option => 
            option.setName("mode")
                .setDescription("What mode you want me to be in ?")
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.has("694260547570630706")) {
            await interaction.reply("does he know? :ICANT:");
            return;
        }
        
        const choice = interaction.options.getString("mode");
        if (choice == "mute" || choice == "deafen" || choice == "off") {
            interaction.client.mode = choice;
            await interaction.reply(`mode is now ${interaction.client.mode}`);
            return
        }

        await interaction.reply(`nice mode bozo`);
    }
}