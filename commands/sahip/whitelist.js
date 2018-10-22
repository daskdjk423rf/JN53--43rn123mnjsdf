const { Command } = require('discord.js-commando');

module.exports = class WhitelistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'beyaz-liste',
			aliases: ['beyaz-liste', 'beyazlist', 'whiteliste', '', 'whitelist', 'beyazliste', 'beyaz liste'],
			group: 'admin',
			memberName: 'beyaz-liste **(kara listeden kurtarmak istediğiniz kişi)**',
			description: 'Kara Listedeki Velirlediğiniz Kullanıcıyı Siler.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'user',
					prompt: 'kimi Kara Listeden Kurtarmak İstersiniz?\n',
					type: 'user'
				}
			]
		});
	}

	hasPermission(message) {
		return this.client.isOwner(message.author);
	}

	run(message, { user }) {
		const blacklist = this.client.provider.get('global', 'userBlacklist', []);
		if (!blacklist.includes(user.id)) return message.reply(`Bu Kullanıcı Kara Listede Değil.`);

		const index = blacklist.indexOf(user.id);
		blacklist.splice(index, 1);

		if (blacklist.length === 0) this.client.provider.remove('global', 'userBlacklist');
		else this.client.provider.set('global', 'userBlacklist', blacklist);

		return message.reply(`**${user.tag}** Adlı Kullanıcı Başarıyla Kara Listeden Çıkarıldı.`);
	}
};