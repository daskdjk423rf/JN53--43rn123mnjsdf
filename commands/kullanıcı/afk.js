const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
let afkUsers = require('../../bin/afk.json');
const { RichEmbed } = require('discord.js')

module.exports = class AFKCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'afk',
            group: 'kullanıcı',
			memberName: 'afk',
			description: 'AFK Moduna Geçersiniz.(Sizi birisi etiketlediğinde AFK olduğunuzu söyler.)',

			args: [
				{
				key: 'msg',
				label: 'message',
				prompt: 'Neden AFK Olmak İstiyorsun?',
				type: 'string',
			}
		],
		})
	}

	async run(message, args) {
		if (afkUsers[message.author.id]) {
			afkUsers[message.author.id].afk = true;
			afkUsers[message.author.id].status = args;
			afkUsers[message.author.id].id = message.author.id;
			const embed = new RichEmbed()
			.setColor("RANDOM")
			.setDescription(`<@${message.author.id}>, Adlı Kullanıcı Artık **${JSON.stringify(afkUsers[message.author.id].status.msg)}** Sebebi İle AFK!`)
			message.channel.send(embed)
		} else {	
		    afkUsers[message.author.id] = {
				'afk': false,
				'status': 'Online'
			};

			message.reply(`Bu Komutu İlk Kullanımda Çalıştıramazsınız. Lütfen Komutu Tekrar Kullanınız.`)
		}
	}
};