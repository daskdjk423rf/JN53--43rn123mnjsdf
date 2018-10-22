const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'oto-rol-ayarla',
			aliases: ['giriş-rol-ayarla', 'girişrol', 'giriş-rol', 'girişrolayarla', 'otorolayarla', 'otorol', 'oto-rol', 'otomatikrol', 'otomatik-rol', 'otorolaç', 'otorol-aç', 'otorol-kapat', 'otorolkapat', 'oto-rol', 'roloto', 'rol-oto',],
			group: 'ayarlar',
			memberName: 'oto-rol-ayarla **(rol ismi)**',
			description: 'Giriş Rolü Ayarlamanızı/Belirlemenizi Sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'rol',
					prompt: 'Hangi Rol giriş Rolü Olarak Ayarlansın? (rol ismini yazınız)\n',
					type: 'role',
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
			const vt = this.client.provider.get(message.guild.id, 'girisRol', []);
			const db = this.client.provider.get(message.guild.id, 'girisRolK', []);
			if (vt === args.rol.id) {
				this.client.provider.set(message.guild.id, 'girisRolK', true);
				message.channel.send(`${this.client.emojis.get('464406477851983883')} Giriş Rolü Zaten **<@${args.rol.id}>** Olarak Ayarlı.`);
			} else {
				this.client.provider.set(message.guild.id, 'girisRol', args.rol.id);
				this.client.provider.set(message.guild.id, 'girisRolK', true);
				return message.channel.send(`${this.client.emojis.get('464406478153973770')} Giriş Rolü **<@${args.rol.id}>** Rolü Olarak Ayarlandı.`);
			}
	}
};