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
    msg = message.content.toString().toLowerCase();
    if (msg === "hello") {
        message.reply('Wenas noches')
    }
})

bot.login(process.env.BOT_TOKEN);