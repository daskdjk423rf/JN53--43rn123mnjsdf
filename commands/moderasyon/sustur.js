const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ModerationMuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sustur',
			aliases: ['susturma', 'sunucuda sustur', 'muteat', 'mute'],
			group: 'moderasyon',
			memberName: 'sustur',
			description: 'İstediğiniz Kişiyi Susturur.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					label: 'kullanıcı',
					prompt: 'Kimi Susturmak İstersin?',
					type: 'member'
				},
				{
					key: 'sebep',
					label: 'sebep',
					prompt: 'Neden Bu Kişiyi Susturmak İstiyorsun?',
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
		const mL = this.client.provider.get(msg.guild.id, 'muteList', []);
		if (db ==! "evet") return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Lütfen \`mod-log-ayarla\` Komutu İle mod-log Kanalı Belirleyiniz.`);
		let modlog = vt;
		if (!modlog) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Mod-log Olarak Belirlediğiniz Kanal Silinmiş, Lütfen Yeni  Bir mod-log Kanalı Açıp \`mod-log-ayarla\` Komutu İle mod-log Olarak Ayarlayınız.`);
		if (!msg.guild.member(user).kickable) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Bu Kişiyi Susturamıyorum Çünkü \`O Benden Daha Yetkili\` Ya da \`Bana Bunu Yapmak İçin Gerekli Yetkiyi Vermedin`);
		if (mL.includes(user.id)) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Bu Kişi Zaten Suturulmuş.`);
		if (user.id === msg.author.id) return msg.say(`${this.client.emojis.get('464406477851983883')} Kendini Susturamazsın.`)
		if (member.highestRole.calculatedPosition > msg.member.highestRole.calculatedPosition - 1) {
			return msg.say(`${this.client.emojis.get('464406477851983883')} Bu Kişinin Senin Rollerinden/Rolünden Daha Yüksek Rolleri/Rolü Var.`);
		}
		
		mL.push(user.id);

		this.client.provider.set(msg.guild.id, 'muteList', mL);
		msg.channel.overwritePermissions(user.id, {
			SEND_MESSAGES: false
		});

		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setAuthor(`${msg.author.tag} (${msg.author.id})`)
		.addField(`❯ Eylem:`, `Susturma`)
		.addField(`❯ Kullanıcı:`, `${user.tag} (${user.id})`)
		.addField(`❯ Yetkili:`, `${msg.author.tag} (${msg.author.id})`)
		.addField(`❯ Sebep`, reason)
		.setThumbnail(user.avatarURL)
		.setTimestamp()
		.setFooter(`REİS BOT | Kasa: ${kasano}`, this.client.user.avatarURL)
		guild.channels.get(modlog).send({embed});
		return msg.channel.send(`${this.client.emojis.get('464406478153973770')} İşlem Başarılı!`);
	}
};