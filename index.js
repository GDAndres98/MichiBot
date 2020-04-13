require('dotenv').config();
const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const request = require('request');

const bot = new Client();
const PREFIX = '!';

const url = "https://api.thecatapi.com/v1/images/search";
const options = { json: true };

bot.on('ready', () => {
    console.log('Bot is ON');
});

bot.on('message', message => {
    args = message.content.substring(PREFIX.length).toLowerCase().split(' ');
    switch (args[0]) {
        case 'ding':
            if (args[1] === 'dong')
                message.channel.send('DING DONG! DING DONG!');
            else
                message.channel.send('DONG!');
            break;
    }
});

bot.on('message', message => {
    args = message.content.substring(PREFIX.length).toLowerCase().split(' ');
    switch (args[0]) {
        case 'sapo':
            if (args[1] !== '' || args[1] !== undefined) {
                const sapito = new MessageAttachment('https://pngimage.net/wp-content/uploads/2018/06/sapo-png-1.png');
                mention = message.mentions.users;
                const men = [];
                mention.forEach(x => {
                    men.push(`<@!${x.id}>`);
                });
                text = men.length > 1 ? 'son unos sapos HPs' : men.length === 1 ? 'es un sapo HP' : '';

                if (men.includes('<@!698803313931583539>')) {
                    message.reply(`No me metas en tus asuntos, puta. :poop:`);
                }
                else if (text !== '') {
                    message.channel.send(`${men.join(', ')} ${text}`, sapito);
                } else {
                    message.channel.send('Debes mencionar a alguien, puta.');
                }
            } else {
                message.channel.send('Debes mencionar a alguien, puta.');
            }
            break;
    }
});

bot.on('message', message => {
    msg = message.content.substring(PREFIX.length).toLowerCase();
    if (msg == 'own') {
        request(url, options, (error, res, body) => {
            if (!error && res.statusCode == 200) {
                const cat = new MessageAttachment(body[0].url);
                message.channel.send(cat);
            }
        });
    }
});

bot.on('message', message => {
    msg = message.content.substring(PREFIX.length).toLowerCase();
    if (msg === 'hello') {
        message.reply('Wen dia')
    }
    else if (msg === 'bye') {
        message.reply('Wenas noches')
    }
    else if (msg === 'help') {
        const embed = new MessageEmbed()
            .setTitle('Comandos aceptados')
            .setColor(0x00CF2F)
            .setDescription(`
            !hello - Te saluda
            !bye - Te despide
            !sapo - Insulta a alguien por ti`);
        message.channel.send(embed);
    }
});

bot.login(process.env.BOT_TOKEN);