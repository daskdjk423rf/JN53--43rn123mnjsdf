const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'log-ayarla',
			aliases: ['logayarla', 'log', 'logs', 'logayarlama', 'logsayarla', 'logs-ayarla', 'log ayarla'],
			group: 'ayarlar',
			memberName: 'log-ayarla **(#kanalismi)**',
			description: 'Log Kanalını Değiştirmenizi/Ayarlamanızı Sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'Log Kanalı Hangi Kanal Olsun? (#kanalismi şeklinde yazınız)\n',
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
		if (args.channel) {
			const vt = this.client.provider.get(message.guild.id, 'logsChannel', []);
			const db = this.client.provider.get(message.guild.id, 'logsEnable', []);
			if (vt === args.channel.id) {
				this.client.provider.set(message.guild.id, 'logsEnable', true);
				message.channel.send(`${this.client.emojis.get('464406477851983883')} Log Kanalı Zaten **<#${args.channel.id}>** Olarak Ayarlı.`);
			} else {
				this.client.provider.set(message.guild.id, 'logsChannel', args.channel.id);
				this.client.provider.set(message.guild.id, 'logsEnable', true);
				return message.channel.send(`${this.client.emojis.get('464406478153973770')} Log Kanalı **<#${args.channel.id}>** Kanalı Olarak Ayarlandı.`);
			}
		}
	}
}