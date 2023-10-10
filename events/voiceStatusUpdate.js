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
                previousChannelId = client.previousMemberChannels.get(newState.member.id);
                newState.setChannel(client.channels.cache.get(previousChannelId));
                client.previousMemberChannels.remove()
                return;
            }
            newState.setChannel(client.defaultChannelId);
            return;
        }
        if (violation) {
            client.previousMemberChannels.put(newState.member.id, channelId)
            newState.setChannel(client.cache.channels.get(client.muteDeafenChannelId))
            return
        }
    }
};