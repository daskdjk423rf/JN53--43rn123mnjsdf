const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'davet-oluştur',
            group: 'sunucu',
            memberName: 'davet-oluştur',
            aliases: ['davet', 'davetlink', 'sunucudavet', 'linkdavet', 'oluşturdavet', 'davet-link', 'sunucu-davet', 'davet-sunucu', 'davetoluştur', 'davet-oluştur', 'davvetkur', 'davet-kur', 'kurdavet', 'kur-davet'],
            description: 'Bulunduğunuz Suncuda Davet Linki Oluşturur.',
        });
    }

async run(msg) {
    
    let davet;
    if (msg.channel.permissionsFor(this.client.user).has("CREATE_INSTANT_INVITE")) {
        await msg.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0, unique: false}).then(i => { davet = i.url });
    } else davet = 'Davet Linkini Almak İçin Yeterli Yetkim Yok.';

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(msg.guild.name, msg.guild.iconURL)
    .addField(`${msg.guild.name} Sunucusunun Davet Linki`, davet)
    .setThumbnail(msg.guild.iconURL)
    .setTimestamp()
    return msg.channel.send({embed})
    }
}