const Discord = require('discord.js');
const bot = new Discord.Client();

const token = require('./tokens.json').token;

console.log(token)

const PREFIX = '!';

bot.on('ready', () => {
    console.log("Bot is online")
})

bot.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase) {
        case 'ding': 
            msg.channel.send('DONG!');
            break;
    }
})

bot.on('message', msg => {
    if (msg.content === "HELLO") {
        msg.reply('Wenas noches')
    }
})

bot.login(token);