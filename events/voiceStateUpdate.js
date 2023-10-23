const { Events } = require('discord.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        if (oldState.selfMute == newState.selfMute && 
            oldState.selfDeaf == newState.selfDeaf && 
            oldState.channelId == newState.channelId) {
                return;
        }

        const client = newState.client;
        const memberId = newState.member.id;
        if (client.mode == "off") {
            return;
        }

        let channelId = newState.channelId;
        if (!channelId) {
            return;
        }

        const violation = ((newState.selfMute && client.mode == "mute") || 
                          (newState.selfDeaf && client.mode == "deafen"));
        if (channelId == client.muteDeafenChannelId && !violation) {
            if (client.prevMemberChannels.has(memberId)) {
                const prevChannelId = client.prevMemberChannels.get(memberId);
                newState.setChannel(prevChannelId);
                client.prevMemberChannels.delete(memberId);
                return;
            }
            newState.setChannel(client.defaultChannelId);
            return;
        }
        if (channelId != client.muteDeafenChannelId && violation) {
            client.prevMemberChannels.set(memberId, channelId);
            newState.setChannel(client.muteDeafenChannelId);
            return;
        }
    }
};