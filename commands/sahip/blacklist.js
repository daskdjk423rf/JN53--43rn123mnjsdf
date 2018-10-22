const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kara-liste',
			aliases: ['kara-liste', 'karalist', 'darkliste', 'darklist', 'karaliste', 'kara liste', 'blacklist', 'blackliste'],
			group: 'admin',
			memberName: 'kara-liste **(kara listeye alıcağınız kişi)**',
			description: 'Kullanıcıyı Bottan Banlamanızı Sağlar. Bu Botu Daha Kullanamaz.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'user',
					prompt: 'Kim Karalisteye Alınsın?\n',
					type: 'user'
				}
			]
		});
	}

	hasPermission(message) {
		return this.client.isOwner(message.author);
	}

	run(message, { user }) {
		if (this.client.isOwner(user.id)) return message.reply(`Bot Sahibi Kara Listeye alınamaz.`);

		const blacklist = this.client.provider.get('global', 'userBlacklist', []);
		if (blacklist.includes(user.id)) return message.reply(`Bu Kişi Zaten Kara Listede Bulunuyor.`);

		blacklist.push(user.id);
		this.client.provider.set('global', 'userBlacklist', blacklist);

		return message.reply(`**${user.tag}** Adlı Kullanıcı Kara Listeye Alındı.`);
	}
};