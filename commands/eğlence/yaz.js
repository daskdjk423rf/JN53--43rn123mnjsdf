const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class YazCommand extends Command {
    constructor(client){

        super(client, {

            name: 'yaz',
            group: 'eğlence',
            memberName: 'yaz',
            description: 'Bota Yazı Yazdırırsınız.',

            args: [
                {
                    key: 'yazi',
                    prompt: 'Bota Ne Yazdırmak Sstersin?',
                    type: 'string'
                }
            ]
        })
    }


    run(message, args) {
    const { yazi } = args;
    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(yazi)
    .setTimestamp()
    message.delete()
    return message.embed(embed)

    }
}
