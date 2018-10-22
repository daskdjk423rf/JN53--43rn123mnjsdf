const { Command } = require('discord.js-commando')
const commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'hakkında',
			aliases: ['istatistik', 'davet', 'i', 'd', 'bilgi'],
            group: 'bot',
            memberName: 'hakkında',
            description: 'Bot Hakkında Bilgi Verir.(Botun Davet Linklerini Atar, Hakkında Bilgi Verir Ve İstatistiklerini Gösterir.)',
        }) 
    }

    async run(message) {
		var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();

		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.addField(`❯ Botun İsmi/Adı:`, `REİS BOT`)
		.addField(`❯ Botun Sahibi/Yapımcısı:`, `<@399230647970955273>`)
		.addField(`❯ Botun Prefixi/Ön-Eki:`, `?`)
		.addField(`❯ Açık Kalma Süresi/Çalışma Süresi:`, '7/24 AÇIK')
		.addField(`❯ İşletim Sistemi:`, `${osType}`)
		.addField(`❯ Bellek kullanımı:`, `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`)
		.addField(`❯ Genel istatistikler:`, stripIndents`
		**• Sunucu:** ${this.client.guilds.size}
		**• Kanal:** ${this.client.channels.size}
		**• Kullanıcı:** ${this.client.users.size}
		**• Ping/Gecikme Süresi:** ${this.client.ping ? `${Math.round(this.client.ping)}ms.` : ''}
		`)
		.addField(`❯ Sürümler:`, stripIndents`
		**• Bot:** v3.0.0
		**• Discord.js:** v${Discord.version}
		**• Discord.js-commando:** v${commando.version}
		**• Node:** ${process.version}
		`)
		.addField(`❯ Botun Linkleri:`, `**[Botu sunucuna eklemek için tıkla!](BOTUN YAPIMCISINA SÖYLEYİN EKLESİN YAPIMCI <@399230647970955273>) \n[Botun sitesine bakmak için tıkla!](BOTUN YAPIMCISINA SÖYLEYİN EKLESİN YAPIMCI <@399230647970955273>)**`)
        .setFooter('©' + (new Date()).getFullYear() + ' REİS BOT')
		.setThumbnail(this.client.user.avatarURL)
		message.channel.send({embed});
        }
    };