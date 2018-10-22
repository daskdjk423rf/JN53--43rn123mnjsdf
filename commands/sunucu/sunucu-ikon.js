const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sunucu-resim',
            group: 'sunucu',
            aliases: ['sunucuresim', 'sunucu-icon', 'serverresim', 'sunucuicon', 'servericon'],
            memberName: 'sunucu-resim',
            description: 'Sunucunun Resmini Gösterir.',
        });    
    }

    run(msg) {

            const embed = new RichEmbed()
            .setColor("RANDOM")
            .setImage(msg.guild.iconURL)
            .setAuthor(msg.guild.name + '**Sunucusu Resimi**')
            return msg.embed(embed)
        }
};