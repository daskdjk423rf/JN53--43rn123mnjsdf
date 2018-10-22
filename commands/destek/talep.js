const commando = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'talep',
            group: 'destek',
            memberName: 'talep',
            description: 'Sunucunuzda destek talebi açar.',
});
}
     
run(message) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Destek Ekibi")) return message.channel.send(`Bu Sunucuda '**Destek Ekibi**' Rolünü Bulamadım. Talep odası Açabilmem İçin **Destek Ekibi** İsminde Bir Rol Oluşturup Talep Ddalarını Görebilecek Kişilere Yani Yetkililere Veriniz.`);
    if (message.guild.channels.exists("name", "destek-" + message.author.id)) return message.channel.send(`Zaten Açık Durumda Bir Talebin Var.`);
    message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Destek Ekibi");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`Destek Talebi Oluşturuldu, <#${c.id}> Burada Yetkililer Size Yardımcı Olacaktır.`).then(message => message.delete());
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField(`Merhaba ${message.author.username}!`, ` Yetkililerimiz Burada Sizinle İlgilenecektir. \nDestek Talebini Kapatmak İçin \`?kapat\` Yazabilirsiniz.
        `)
        .setFooter(`REİS BOT | Destek Talebi Sistemi`, this.client.user.avatarURL)
        .setTimestamp();
        c.send({ embed: embed });
        c.send(`<@${message.author.id}> Adlı Kullanıcı Destek Talebi Açtı! @everyone`)
        message.delete();
    }).catch(console.error);
}}

