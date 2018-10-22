const { Command } = require('discord.js-commando');

module.exports = class ModerationCleanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'temizle',
			aliases: ['mesajsil', 'mesajlarısil', 'sil'],
			group: 'moderasyon',
			memberName: 'temizle',
			description: 'İstediğiniz Sayıda Mesaj Siler.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'limit',
					prompt: 'Kaç Mesaj Silmek İstersiniz?\n',
					type: 'integer'
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_GUILD");
    }

	async run(msg, args) {
		const sayi1 = args.limit;
		const sayi  = Number(sayi1);
		if (sayi < 2) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} En az 2 mesaj silebilirim.`);
		if (sayi > 100) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} En fazla 100 mesaj silebilirim.`);
		if (sayi < 100) {
			msg.channel.send(sayi + ' adet mesaj sorgulanıyor...').then(smsg => {
				msg.channel.fetchMessages({limit: parseInt(sayi) + 2}).then(messages => {
					smsg.edit(parseInt(messages.size) - 2 + ' Adet Mesaj Bulundu. Bulunan Mesajlar Siliniyor...').then(bmsg => {
						msg.channel.bulkDelete(messages.size, true).then(deletedMessages => {
							if (deletedMessages.size < 1) return bmsg.edit(`${this.client.emojis.get('464406477851983883')} Hiç Mesaj Silinemedi. _(14 Günden Daha Eski Mesajlar Var İse Bundan Dolayı Mesajlar Silinememiş Olabilir.)_`).then(msg => msg.delete(3000));
							const mesajadet = parseInt(deletedMessages.size) - 2;
							msg.channel.send(`${this.client.emojis.get('464406478153973770')}` + mesajadet + ' Adet Mesaj Silindi!').then(msg => msg.delete(3000));	
						})
					})
				});
			});
		} else {
			msg.channel.send(sayi + ' Adet Mesaj Sorgulanıyor...').then(smsg => {
				msg.channel.fetchMessages({limit: parseInt(sayi)}).then(messages => {
					smsg.edit(parseInt(messages.size) + ' Adet Mesaj Bulundu. Bulunan Mesajlar Siliniyor...').then(bmsg => {
						msg.channel.bulkDelete(messages.size, true).then(deletedMessages => {
							if (deletedMessages.size < 1) return bmsg.edit(`${this.client.emojis.get('464406477851983883')} Hiç Mesaj Silinemedi. _(14 Günden Daha Eski Mesajlar Var İse Bundan Dolayı Mesajlar Silinememiş Olabilir)_`).then(msg => msg.delete(3000));
							const mesajadet = parseInt(deletedMessages.size);
							msg.channel.send(`${this.client.emojis.get('464406478153973770')}` + mesajadet + ' Adet Mesaj Silindi!').then(msg => msg.delete(300));	
						})
					})
				});
			});
		}
	}
};