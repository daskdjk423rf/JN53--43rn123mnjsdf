const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class mesajCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'çağır',
            group: 'bot',
            memberName: 'çağır',
            description: `Bot Sahibini (Enes Acar'ı) Çağırır.`,
        });
    }

async run(message) {

    let davet;
        if (message.channel.permissionsFor(this.client.user).has("CREATE_INSTANT_INVITE")) {
            await message.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0, unique: false}).then(i => { davet = i.url });
        } else davet = 'Davet Linkini Almak İçin Yeterli Yetkim Yok.';

    message.reply(`${this.client.emojis.get('464406478153973770')} Sahibim Çağırıldı! Sahibim Yakında Sunucunuza Gelecektir.`);

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.author.tag} Adlı Kullanıcını Seni Çağırıyor.`)
    .addField(`❯ Kulanıcı Hakkında`, `Kullanıcı İsim: ${message.author.tag} \nKullanıcı ID: ${message.author.id}`)
    .addField(`❯ Sunucu Hakkında`, `Sunucu Adı: ${message.guild.name} \nSunucu ID: ${message.guild.id}`)
    .addField(`❯ Çağrıldığın Sunucu`, davet)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    this.client.users.get(`427400103377108992`).send(embed);
}
}