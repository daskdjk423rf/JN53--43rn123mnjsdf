const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tavsiye',
            group: 'bot',
            memberName: 'tavsiye (tavsiyeniz)',
            description: 'Bot İçin Tavsiye Bildirirsiniz.',
            args: [
                {
                    key: 'tavsiye',
                    prompt: 'Bot İçin Ne Tavsiyesi Bildirmek İstersiniz?',
                    type: 'string'
                }
            ]
        });
    }

async run(message, args) {

    let davet;
        if (message.channel.permissionsFor(this.client.user).has("CREATE_INSTANT_INVITE")) {
            await message.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0, unique: false}).then(i => { davet = i.url });
        } else davet = 'Davet Linkini Almak İçin Yeterli Yetkim Yok.';

    message.reply(`${this.client.emojis.get('464406478153973770')} Tavsiyeniz Bildirildi! Yakında Öneriniz/Tavsiyeniz Hakkında Geri Dönüş Yapılacaktır.`);

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`» Yeni bir tavsiye!`)
    .addField(`❯ Gönderilen Tavsiye`, args.tavsiye)
    .addField(`❯ Gönderen Kullanıcı Hakkında`, `• Kullanıcı ID: ${message.author.id} \n• Kullanıcı Adı: ${message.author.tag}`)
    .addField(`❯ Gönderilen Sunucu Hakkında`, `• Sunucu ID: ${message.guild.id} \n• Sunucu Adı: ${message.guild.name}`)
    .addField(`❯ Gönderilen Sunucu`, davet)
    .setThumbnail(message.author.avatarURL)
    .setFooter(`REİS BOT | Tavsiye Sistemi`)
    .setTimestamp()
    this.client.channels.get(`465072349570400258`).send({embed})
    }
}