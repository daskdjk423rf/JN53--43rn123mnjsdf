const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const ascii = require('figlet');

module.exports = class AsciiTextCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'ascii',
      aliases: ['ascii-yazı', 'aşçı', 'ascii'],
      group: 'eğlence',
      memberName: 'ascii (mesajınız)',
      description: 'Yazınız ascii şeklinde olur.',
      examples: ['ascii sa'],
      args: [{
        key: 'toAscii',
        label: 'text',
        prompt: 'Ascii Şeklinde Yazmak İstediğiniz Yazı ?',
        type: 'string',
        validate: text => {
          if (text.length <= 10) return true
          //eslint-disable-next-line newline-before-return
          return 'Mesajınız Çok Uzun! 10 Karakter Veya Daha Az Olmalı.'
        },
        infinite: false
      }]
    })
  }

  //eslint-disable-next-line class-methods-use-this
  async run(message, args) {
    ascii(args.toAscii, {
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted'
      },
      function(err, data) {
        if (err) {
          message.reply('Bir Şeyler Yanlış Gitti! Bir Geliştiriciyle İletişime Geçin.')
          console.error(err)
        }
        message.delete(1)
        message.channel.send(data, {
          code: 'text'
        })
      })
  }
};