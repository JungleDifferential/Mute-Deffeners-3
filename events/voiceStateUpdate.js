const { Events } = require('discord.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        const client = newState.client;
        if (client.mode == "off") {
            return;
        }

        let channelId = newState.channelId;
        if (channelId == null) {
            return;
        }

        const violation = ((newState.selfMute && client.mode == "mute") || 
                          (newState.selfDeaf && client.mode == "deafen"));
        if (channelId == client.muteDeafenChannelId && !violation) {
            if (client.previousMemberChannels.has(newState.member.id)) {
                const previousChannelId = client.previousMemberChannels.get(newState.member.id);
                newState.setChannel(previousChannelId);
                client.previousMemberChannels.remove(newState.member.id)
                return;
            }
            newState.setChannel(client.defaultChannelId);
            return;
        }
        if (violation) {
            client.previousMemberChannels.set(newState.member.id, channelId);
            newState.setChannel(client.muteDeafenChannelId);
            return;
        }
    }
};