const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'Njk4ODAzMzEzOTMxNTgzNTM5.XpLM_w.V0NkXSOgwvTaGKnR2PJ9EQJ75sg';

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