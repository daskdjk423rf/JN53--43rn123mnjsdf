const { Command } = require('discord.js-commando');

module.exports = class ModChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'başvuru-kanal-ayarla',
            aliases: ['başvurukanal', 'başvuru-kanal','başvuru-ayarla', 'başvuruayarla', 'kayıt-ayarla', 'kayıt-ol-ayarla', 'kayıtaç', 'kayıtkapat', 'kayıt-kanal-ayarla', 'başvuruayarları',],
            group: 'başvuru',
            memberName: 'başvuru-kanal-ayarla',
            description: 'Başvuruların Gönderileceği Kanalı Ayarlar.',
            guildOnly: true,
			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'channel',
                    prompt: 'Hangi Kanal Başvuru Kanalı Olarak Kullanılsın?\n',
                    type: 'channel'
                }
            ]
        });
    }
    
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

    async run(message, args) {
        const { channel } = args;
        message.guild.settings.set('başvuruKanal', channel.id);
        return message.channel.send(`${this.client.emojis.get('464406478153973770')} Başvuru Formlarının Gönderileceği Kanal <#${channel.id}> Kanalı Olarak Ayarlandı.`);
    }
};