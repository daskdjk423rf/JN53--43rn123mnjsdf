const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'giriş-çıkış-ayarla',
			aliases: ['hoş-geldin-ayarla', 'hoşgeldinayarla', 'girişçıkış', 'girişçıkışayarla', 'giriş-çıkış', 'giriş-çıkış-ayarla', 'ayarlagirişçıkış', 'ayarla-girişçıkış', 'ayarla-giriş-çıkış', 'hoşgeldinaç', 'hoşgeldinkapat', 'hoşgeldinayarla', 'hoşgeldin-ayarla', 'hoşgeldin-aç', 'hoşgelin-kapat', 'hoşgeldin'],
			group: 'ayarlar',
			memberName: 'giriş-çıkış-ayarla **(#kanalismi)**',
			description: 'Giriş Çıkış Kanalı Ayarlamanızı/Değiştirmenizi Sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'kanal',
					prompt: 'Giriş Çıkış Kanalı Hangi Kanal Olsun? (**#kanalismi** şeklinde yazınız)\n',
					type: 'channel',
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
			const vt = this.client.provider.get(message.guild.id, 'girisCikis', []);
			const db = this.client.provider.get(message.guild.id, 'girisCikisK', []);
			if (vt === args.kanal.id) {
				this.client.provider.set(message.guild.id, 'girisCikisK', true);
				message.channel.send(`${this.client.emojis.get('464406477851983883')} Giriş Çıkış Kanalı Zaten **<#${args.kanal.id}>** Kanalı Olarak Ayarlı.`);
			} else {
				this.client.provider.set(message.guild.id, 'girisCikis', args.kanal.id);
				this.client.provider.set(message.guild.id, 'girisCikisK', true);
				return message.channel.send(`${this.client.emojis.get('464406478153973770')} Giriş Çıkış Kanalı **<#${args.kanal.id}>** Kanalı Olarak Ayarlandı.`);
			}
	}
};