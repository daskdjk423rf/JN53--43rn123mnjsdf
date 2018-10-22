const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const { RichEmbed } = require('discord.js');

module.exports = class SupportCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'canlı-destek',
      group: 'bot',
      memberName: 'canlı-destek',
      description: 'REİS BOT Destek Ekibi İle Görüşmeye Bağlanırsınız.',
      details: oneLine `
               REİS BOT İle İlgili Yardıma İhtiyacınız Var Mı?
               Geliştiricilerle İletişime Geçmek Ve İhtiyacınız Olan Yardımı Almak İçin Bu Komutu Kullanın!
			`,
      examples: ['canlı-destek'],
      guildOnly: true,
      guarded: true
    })
  }

  async run(message) {
    let davet;
        if (message.channel.permissionsFor(this.client.user).has("CREATE_INSTANT_INVITE")) {
            await message.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0, unique: false}).then(i => { davet = i.url });
        } else davet = 'Davet Linkini Almak İçin Yeterli Yetkim Yok.';
    let isEnabled
    const client = this.client
    message.reply(`${this.client.emojis.get('464406478153973770')} REİS BOT Desteği İle İletişim Kurduğunuz İçin Teşekkür Ederiz! Herhangi Bir Destek Yetkilisi Varsa, Yakında Sizinle İletişim Kuracaktır.`)
    let chan = message.channel
    let supportChan = '464841043632848907'
    const embed = new RichEmbed()
      .setTitle(':bangbang: **Yeni Destek Çağrısı** :bangbang:')
      .setColor("RANDOM")
      .setDescription(`**Sunucu Adı:** ${message.guild.name} (${message.guild.id}) \n**Kanal:** #${message.channel.name} (${message.channel.id}) \n**Destek İsteyen**: ${message.author.tag} (${message.author.id}) \n**Destek İstenen Sunucu:** ` + davet)
      .setFooter('REİS BOT canlı-destek sistemi')
      .setTimestamp()
		this.client.channels.get(supportChan).send('<@&464840738568404994>')
		this.client.channels.get(supportChan).send({ embed })
    const collector = this.client.channels.get(supportChan).createCollector(message => message.content.startsWith(''), {
      time: 0
    })
    this.client.channels.get(supportChan).send('Destek Çağrısına Bağlanmak İçin `katıl` Yazınız.')
    collector.on('message', (message) => {
      if (message.content === 'kapat') collector.stop('aborted')
      if (message.content === 'katıl') collector.stop('success')
    })
    collector.on('end', (collected, reason) => {
      if (reason === 'time') return message.reply(`Çağrı Zaman Aşımına Uğradı.`)
      if (reason === 'aborted') {
        message.reply(':x: Çağrı Reddedildi.')
        this.client.channels.get(supportChan).send(`Başarıyla Çağrı Reddedildi.`)
      }
      if (reason === 'success') {
        this.client.channels.get(supportChan).send(`Destek Çağrısı Alındı!`)
        //eslint-disable-next-line no-useless-escape
        this.client.channels.get(supportChan).send('Destek Çağrısını Kapatmak İçin `kapat` Yazınız.')
        chan.send(`${message.author}`)
        chan.send(`Çağrınız Bir Destek Yetkilisi Tarafından Alındı!`)
        chan.send('En Kısa Zamanda Size Yardımcı Olacaklar.')
        //eslint-disable-next-line no-useless-escape
        chan.send('Destek Çağrısını Kapatmak İçin `kapat` Yazınız.')
        isEnabled = true
        this.client.on('message', message => {
          function contact() {
            if (isEnabled === false) return
            if (message.author.id === client.user.id) return
            if (message.content.startsWith('kapat')) {
              message.channel.send(`Çağrı Kapatıldı.`)
              if (message.channel.id === chan.id) client.channels.get(supportChan).send(`Çağrı Diğer Taraftan Kapatıldı.`)
              if (message.channel.id === supportChan) chan.send(`Çağrı Diğer Taraftan Kapatıldı.`)

              return isEnabled = false
            }
            if (message.channel.id === chan.id) client.channels.get(supportChan).send(`**(Kullanıcı) ${message.author.tag}**: ${message.content}`)
            if (message.channel.id === supportChan) chan.send(`**(Canlı Destek) ${message.author.tag}:** ${message.content}`)
          }
          contact(client)
        })
      }
    })
  }
};