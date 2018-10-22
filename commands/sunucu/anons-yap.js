const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class AnonsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anons-yap',
            aliases: ['duyuru-yap', 'duyuru', 'anonsyap', 'anons', 'duyuru-yap', 'duyuru', 'duyur', 'sunucuduyuru', 'sunucu-duyuru'],
            group: 'sunucu',
            memberName: 'anons-yap (duyurunuz)',
            description: 'Anons/Duyuru Yaparsınız.',
            examples: ['Sunucuda Reklam Yapmayın'],
 			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'baslik',
                    prompt: 'Anonsun/Duyurunun Başlığının Ne Olmasını İstersiniz ?',
                    type: 'string'
                },
                {
                    key: 'yazi',
                    prompt: 'Anonsta/Duyuruda Ne Yazmasını İstersiniz ?',
                    type: 'string'
                },
            ]
        });    
    }
    
    hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }
    
    run(msg, args) {
        const kanal = msg.guild.channels.get(msg.guild.settings.get('anonsKanal'));
        if (!kanal) return msg.reply(`${this.client.emojis.get('464406477851983883')} Anons Kanalını Bulamıyorum. Lütfen \`anons-kanal-ayarla\` Komutu İle Bir Anons/Duyuru Kanalı Belirleyin.`);
    
          msg.reply(`${this.client.emojis.get('464406478153973770')} İşlem Başarılı!`);
    
          const { baslik, yazi } = args;
       kanal.send('@everyone').then(msg => msg.delete());
        const embed = new RichEmbed()
        .setAuthor(baslik)   
        .setDescription(yazi)
        .setFooter(`REİS BOT | Anons/Duyuru Sistemi`)
        .setTimestamp()
        .setColor("RANDOM")
        return kanal.send(embed);
    
    }
};