const commando = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kapat',
            group: 'destek',
            memberName: 'kapat',
            description: 'Sunucunuzda Açık Olan Bir Destek Talebini Kapatır.',
        });
    }

run(message) {
    if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Bu komut sadece destek talebi kanallarında kullanılabilir.`);

    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Destek Talebi Kapatma İşlemi`, this.client.user.avatarURL)
    .setDescription(`Destek Talebini Kapatmayı Onaylamak İçin 10 Saniye İçinde \`evet\` Yazmanız Gerekmektedir.`)
    .setFooter(`REİS BOT | Destek Talebi Sistemi`, this.client.user.avatarURL)
    message.channel.send({embed})
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Destek Talebi Kapatma İsteğin Zaman Aşımına Uğradı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
  }
}