require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

const PREFIX = '!';

bot.on('ready', () => {
    console.log("Bot is online")
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).toLowerCase().split(" ");
    switch (args[0]) {
        case 'ding':
            if (args[1] === "dong")
                message.channel.send('DING DONG! DING DONG!');
            else
                message.channel.send('DONG!');
            break;
    }
})

bot.on('message', message => {

    msg = `${PREFIX}${message.content.toString().toLowerCase()}`;

    if (msg === `${PREFIX}hello`) {
        message.reply('Wen dia')
    }
    else if (msg === `${PREFIX}bye`) {
        message.reply('Wenas noches')
    }
    else if (message.content === `${PREFIX}sapo`) {
        const sapito = new MessageAttachment('https://pngimage.net/wp-content/uploads/2018/06/sapo-png-1.png');
        message.channel.send('David es un sapo alv.', sapito);
    }
})

bot.login(process.env.BOT_TOKEN);