const commando = require('discord.js-commando');
const Discord = require('discord.js')
var espriler = [
    'Seni görünce; \ngözlerim dolar, \nkulaklarım euro.',
    'Kar üzerinde yürüyen adama ne denir. Karabasan.',
    'Yıkanan Ton’a ne denir? Washington!',
    'Gidenin arkasına bakmayın yoksa geleni göremezsiniz.',
    '+Oğlum canlılara örnek ver. \n-Kedi, köpek. \n+Cansızlara örnek ver. \n-Ölü kedi, ölü köpek.',
    '+Kanka ben banyoya 3 kişi giriyom. \n-Oha nasıl? \n+Hacı, Şakir ve ben. \n-Defol lan!',
    '+Kocanızla ortak özelliğiniz ne? \n-Aynı gün evlendik.',
    '+Evladım ödevini neden yapmadın? \n-Bilgisayarım uyku modundaydı, uyandırmaya kıyamadım.',
    '+Bizim arkadaş ortamında paranın lafı bile olmaz. \n-Niye ki? \n+Çünkü hiç birimizin parası yok.',
    'Annemin bahsettiği elalem diye bir örgüt var illuminatiden daha tehlikeli yemin ederim.',
    '+Acıkan var mı ya? \n-Yok bizde tatlı kan var.',
    'Yılanlardan korkma, yılmayanlardan kork.',
    '+Baykuşlar vedalaşırken ne der? \n-Bay bay baykuş.',
    'Beni Ayda bir sinemaya götürme, Marsta bir sinemaya götür.',
    'Aaa siz çok terlemişsiniz durun size terlik getireyim.',
    'Aklımı kaçırdım, 100.000 TL fidye istiyorum.'
]

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'espri',
            group: 'eğlence',
            memberName: 'espri',
            description: 'Espri yapar.',
            guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 10
             },

        });
    }

async run(message) {

    var espri = espriler[Math.floor(Math.random() * espriler.length)];

  	const embed = new Discord.RichEmbed()
  	.setColor("RANDOM")
    .setDescription(`${espri}`) 
    message.channel.send({embed})
    }
}