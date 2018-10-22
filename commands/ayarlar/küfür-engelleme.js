const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'küfür-engelle',
			aliases: ['küfürengelle', 'küfür-engel', 'küfürleri-engelle', 'küfürengelleme', 'küfüraç', 'küfürkapat', 'küfürkapat', 'küfüraç','küfürengellemeaç' , 'küfürengellemeaç', 'küfür'],
			group: 'ayarlar',
			memberName: 'küfür-engelle',
			description: 'Link Engelleme Özelliğini Açıp/Kapatmanızı Sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'string',
					prompt: 'Küfürler Engellensin Mi? (**evet** ya da **hayır** olarak cevap yazınız)\n',
					type: 'string',
					validate: string => {
						if (string === 'evet' || string === 'hayır') return true;
						else return 'Lütfen `**evet**` Ya da `**hayır**` Yazınız';
					}
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
			if (args.string === "evet") {
				const vt = this.client.provider.get(message.guild.id, 'kufurengel', []);
				this.client.provider.set(message.guild.id, 'kufurengel', true);
				return message.channel.send(`${this.client.emojis.get('464406478153973770')} Küfür Engelleme Sistemi: **açık**.`);
			}
			if (args.string === "hayır") {
				const vt = this.client.provider.get(message.guild.id, 'kufurengel', []);
				this.client.provider.set(message.guild.id, 'kufurengel', false);
				return message.channel.send(`${this.client.emojis.get('464406477851983883')} Küfür Engelleme Sistemi: **kapalı**.`);
			}
	}
};