const { Command } = require('discord.js-commando');

module.exports = class ModChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anons-kanal-ayarla',
            aliases: ['anonskanal', 'anondkanalayarla', 'anonsayarla', 'kanalanons', 'kanalanonsayarla'],
            group: 'ayarlar',
            memberName: 'anons-kanalı (#kanalismi)',
            description: 'Sunucda Anons Kanalı Ayarlar.',
            guildOnly: true,
			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'channel',
                    prompt: 'Hangi Kanal Anons Kanalı Olarak Kullanılsın? (#kanalismi Şeklinde Yazınız.)',
                    type: 'channel'
                }
            ]
        });
    }
    
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_GUILD");
    }

    async run(message, args) {
        
        const { channel } = args;
        message.guild.settings.set('anonsKanal', channel.id);
        return message.channel.send(`${this.client.emojis.get('464406478153973770')} Anons Kanalı **<#${channel.id}>** Olarak Ayarlandı.`);
    }
};