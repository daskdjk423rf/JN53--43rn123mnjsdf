const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ModerationWarnCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'uyar',
			aliases: ['uyarı', 'sunucuda uyar', 'uyarıat', 'uyarı ver'],
			group: 'moderasyon',
			memberName: 'uyar',
			description: 'İstediğiniz kişiye uyarı verir.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					label: 'kullanıcı',
					prompt: 'Kimi Uyarmak İstersin?',
					type: 'member'
				},
				{
					key: 'sebep',
					label: 'sebep',
					prompt: 'Neden Bu Kişiyi Uyarmak İstiyorsun?',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_MESSAGES");
    }

	async run(msg, args) {
		let guild = msg.guild
		const member = args.member;
		const user = member.user;
		const reason = args.sebep;
		const kasa = this.client.provider.get(msg.guild.id, 'modKasa', []);
		const eskikasano = Number(kasa);
		const kasano = parseInt(eskikasano) + 1;
		this.client.provider.set(msg.guild.id, 'modKasa', kasano);
		const vt = this.client.provider.get(msg.guild.id, 'modLog', []);
		const db = this.client.provider.get(msg.guild.id, 'modLogK', []);
		if (db ==! "evet") return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Lütfen \`mod-log-ayarla\` Komutu İle mod-log Kanalı Belirleyiniz.`);
		let modlog = vt;
		if (!modlog) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} `);
		if (user.id === msg.author.id) return msg.say(`${this.client.emojis.get('464406477851983883')} Kendini Uyaramazsın.`)
		if (member.highestRole.calculatedPosition > msg.member.highestRole.calculatedPosition - 1) {
			return msg.say(`${this.client.emojis.get('464406477851983883')} Bu Kişinin Senin Rollerinden/Rolünden Daha Yüksek Rolleri/Rolü Var.`);
		}
		if (!msg.guild.member(user).kickable) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Bu Kişiyi Uyaramıyorum Çünkü \`O Benden Daha Yetkili\` Ya da \`Bana Bunu Yapmak İçin Gerekli Yetkiyi Vermedin\`.`);
		member.send('**' + msg.guild.name + '** Sunucusunda `' + msg.author.tag + '` Adlı Kişi/Yetkili Tarafından ___' + reason + '___ Sebebi İle Uyarıldın.')

		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setAuthor(`${msg.author.tag} (${msg.author.id})`)
		.addField(`❯ Eylem:`, `Uyarma`, false)
		.addField(`❯ Kullanıcı:`, `${user.tag} (${user.id})`, false)
		.addField(`❯ Yetkili:`, `${msg.author.tag} (${msg.author.id})`, false)
		.addField(`❯ Sebep`, reason, false)
		.setFooter(`REİS BOT | Kasa: ${kasano}`, this.client.user.avatarURL)
		.setThumbnail(user.avatarURL)
		.setTimestamp()
		guild.channels.get(modlog).send({embed});
		return msg.channel.send(`${this.client.emojis.get('464406478153973770')} İşlem Başarılı!`);
	}
};