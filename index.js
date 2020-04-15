require('dotenv').config();
const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const request = require('request');
const moment = require('moment');

const bot = new Client();
const PREFIX = '!';

const urlCatAPI = "https://api.thecatapi.com/v1/images/search";
const options = { json: true };


bot.on('ready', () => {
    console.log('Bot is ON');
});


bot.on('message', message => {
    hour = moment().utcOffset(-5).hour();
    args = message.content.substring(PREFIX.length).toLowerCase().split(' ');
    if (message.content[0] === PREFIX)

        switch (args[0]) {

            case 'ding':
                if (args[1] === 'dong')
                    message.channel.send('DING DONG! DING DONG!');
                else
                    message.channel.send('DONG!');
                break;

            case 'sapo':
                if (args[1] !== '' || args[1] !== undefined) {
                    const sapito = new MessageAttachment('https://pngimage.net/wp-content/uploads/2018/06/sapo-png-1.png');
                    mention = message.mentions.users;
                    const men = [];
                    mention.forEach(x => {
                        men.push(`<@!${x.id}>`);
                    });
                    text = men.length > 1 ? 'son unos sapos HPs' : men.length === 1 ? 'es un sapo HP' : '';

                    if (men.includes('<@!698803313931583539>'))
                        message.reply(`No me metas en tus asuntos, puta. :poop:`);
                    else if (text !== '')
                        message.channel.send(`${men.join(', ')} ${text}`, sapito);
                    else
                        message.channel.send('Debes mencionar a alguien, puta.');
                } else {
                    message.channel.send('Debes mencionar a alguien, puta.');
                }
                break;

            case 'own':
                request(urlCatAPI, options, (error, res, body) => {
                    if (!error && res.statusCode == 200) {
                        const cat = new MessageAttachment(body[0].url);
                        message.channel.send(cat);
                    }
                });
                break;

            case 'hello':
                if (hour == 0)
                    message.reply('Feliz hoy!');
                if (hour < 5)
                    message.reply('A dormir, vag@ de mierda >:v');
                else if (hour < 12)
                    message.reply('Wenos dias!');
                else if (hour < 18)
                    message.reply('Wenos TARDES!');
                else
                    message.reply('TARDE, COMO SIEMPRE...');
                break;

            case 'bye':
                if (hour == 0)
                    message.reply('Feliz hoy!');
                if (hour < 5)
                    message.reply('Porfin, maldit@ vag@');
                else if (hour < 12)
                    message.reply('Pero apenas está amaneciendo :\'v');
                else if (hour < 18)
                    message.reply('Wena tarde mij@');
                else
                    message.reply('Wenas nochesitas!');
                break;

            case 'help':
                const embed = new MessageEmbed()
                    .setTitle('Comandos aceptados')
                    .setColor(0x00CF2F)
                    .setDescription(`
                        !hello - Te saludo
                        !bye - Te despido
                        !own - Gatitos para el estrés :3
                        !sapo - Insulto a alguien por ti`);
                message.channel.send(embed);
                break;
        }
});


bot.on('message', message => {
    msg = message.content.substring(PREFIX.length).toLowerCase();

});

bot.login(process.env.BOT_TOKEN);