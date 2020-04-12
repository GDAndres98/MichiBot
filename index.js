const Discord = require('discord.js');
const bot = new Discord.Client();

const token = require('./tokens.json').token;

const PREFIX = '!';

bot.on('ready', () => {
    console.log("Bot is online")
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).toLowerCase().split(" ");
    switch (args[0]) {
        case 'ding': 
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

bot.login(token);