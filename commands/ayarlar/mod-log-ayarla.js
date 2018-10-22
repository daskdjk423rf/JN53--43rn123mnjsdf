const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mod-log-ayarla',
			aliases: ['modlogayarla', 'modlog', 'modlogs', 'modlogayarlama', 'modlogsayarla', 'mod-logs-ayarla', 'mod log ayarla'],
			group: 'ayarlar',
			memberName: 'mod-log-ayarla **(#kanalismi)**',
			description: 'Mod-log Kanalını Değiştirmenizi/Ayarlamanızı Sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'mod-log Kanalı Hangi Kanal Olsun? (#kanalismi şeklinde yazınız)\n',
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
		var ch = await args.channel;
		if (ch.type == 'voice') return message.reply('Sesli Kanallar Seçilemez!');

			const vt = this.client.provider.get(message.guild.id, 'modLog', []);
			const db = this.client.provider.get(message.guild.id, 'modLogK', []);
			if (vt === args.channel.id) {
				this.client.provider.set(message.guild.id, 'modLogK', true);
				message.channel.send(`${this.client.emojis.get('464406477851983883')} Mod-log Kanalı Zaten **${args.channel.name}** Olarak Ayarlı.`);
			} else {
				this.client.provider.set(message.guild.id, 'modLog', args.channel.id);
				this.client.provider.set(message.guild.id, 'modLogK', true);
				return message.channel.send(`${this.client.emojis.get('464406478153973770')} Mod-log Kanalı **<#${args.channel.id}>** Kanalı Olarak Ayarlandı.`);
			}	
	}
};