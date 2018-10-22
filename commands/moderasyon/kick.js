const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ModerationKickCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			aliases: ['at', 'sunucudan at', 'kickle', 'kickhammer', 'sunucudanat'],
			group: 'moderasyon',
			memberName: 'kick',
			description: 'İstediğiniz Kişiyi Sunucudan Atar.',
			details: ``,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					label: 'kullanıcı',
					prompt: 'Kimi Sunucudan Atmak İstersin?',
					type: 'member'
				},
				{
					key: 'sebep',
					label: 'sebep',
					prompt: 'Neden Bu Kişiyi Sunucudan Atmak İstiyorsun?',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission("KICK_MEMBERS");
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
		if (!modlog) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Mod-log Olarak Belirlediğiniz Kanal Silinmiş, Lütfen Yeni  Bir mod-log Kanalı Açıp \`mod-log-ayarla\` Komutu İle mod-log Olarak Ayarlayınız.`);
		if (user.id === msg.author.id) return msg.say(`${this.client.emojis.get('464406477851983883')} Kendini Atamazsın.`)
		if (member.highestRole.calculatedPosition > msg.member.highestRole.calculatedPosition - 1) {
			return msg.say(`${this.client.emojis.get('464406477851983883')} Bu Kişinin Senin Rollerinden/Rolünden Daha Yüksek Rolleri/Rolü Var.`);
		}

		if (!msg.guild.member(user).kickable) return msg.channel.send(`${this.client.emojis.get('464406477851983883')} Bu Kişiyi Sunucudan Atamıyorum Çünkü \`O Benden Daha Yetkili\` Ya da \`Bana Bunu Yapmak İçin Gerekli Yetkiyi Vermedin\`.`);
        member.send('**' + msg.guild.name + '** Sunucusunda `' + msg.author.tag + '` Adlı Kişi/Yetkili Tarafından ___' + reason + '___ Sebebi İle Atıldın.')
		msg.guild.member(user).kick();

		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setAuthor(`${msg.author.tag} (${msg.author.id})`)
		.addField(`❯ Eylem:`, `Sunucudan Atma`)
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