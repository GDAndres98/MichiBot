require('dotenv').config();
const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const axios = require('axios');
const moment = require('moment');
let covid = require('./js/covid.js');
let varios = require('./js/varios.js');

const bot = new Client();
const PREFIX = '!';

const urlCatAPI = 'https://api.thecatapi.com/v1/images/search';

bot.on('ready', () => {
  console.log('On');
});

function sapoFunction(args, message) {
  if (args[1]) {
    const sapito = new MessageAttachment(
      'https://pngimage.net/wp-content/uploads/2018/06/sapo-png-1.png',
    );
    const mention = message.mentions.users;
    const men = [];
    mention.forEach((x) => {
      men.push(`<@!${x.id}>`);
    });
    const text =
      men.length > 1
        ? 'son unos sapos HPs'
        : men.length === 1
          ? 'es un sapo HP'
          : '';

    if (men.includes('<@!698803313931583539>'))
      message.reply(`No me metas en tus asuntos, puta. :poop:`);
    else if (text !== '') {
      let names = `${men.join(', ')}`;
      if (men.length > 1) {
        const x = names.lastIndexOf(',');
        names = names.substring(0, x) + ' y' + names.substring(x + 1);
      }
      message.channel.send(`${names} ${text}`, sapito);
    } else message.channel.send('Debes mencionar a alguien, puta.');
  } else {
    message.channel.send('Debes mencionar a alguien, puta.');
  }
}

async function insulto(args, message){
  if (args[1]) {
    const mention = message.mentions.users;
    const men = [];
    mention.forEach((x) => { men.push(`<@!${x.id}>`);});
    var resp = '';
    for (const i in men) {
      resp = resp + men[i] + ' es un ';
      await varios.getInsult()
        .then((resolve) => {
          resp = resp + `${resolve}`;
        });
      if(i+1 < men.length) resp = resp + ' y ';
    }
    console.log(resp);
    message.channel.send(resp);
  }
  else{
    varios.getInsult().then((resolve) => {
      message.channel.send('Usted es un ' + resolve + ', no etiquetó a nadie >:v');
    });
  }
}

function sumFunction(args, message) {
  let suma = 0;
  for (let x in args) {
    if (x === 0) continue;
    if (args[x] === '' || args[x] === undefined) continue;
    if (!isNaN(args[x])) suma += parseInt(args[x]);
  }
  message.channel.send(`Suma = ${suma}`);
}

bot.on('message', (message) => {
  const hour = moment().utcOffset(-5).hour();
  const args = message.content
    .substring(PREFIX.length)
    .toLowerCase()
    .split(' ');
  if (message.content[0] === PREFIX)
    switch (args[0]) {
    case 'ding':
      if (args[1] === 'dong') message.channel.send('DING DONG! DING DONG!');
      else message.channel.send('DONG!');
      break;

    case 'sapo':
      sapoFunction(args, message);
      break;

    case 'own':
      axios.get(urlCatAPI).then((response) => {
        const cat = new MessageAttachment(response.data[0].url);
        message.channel.send(cat);
      });
      break;

    case 'super':
      varios.getHero()
        .then((res) => {
          message.channel.send(res);
        })
        .catch();
      break;

    case 'sumar':
      sumFunction(args, message);
      break;

    case 'oper':
      var res = '';
      try {
        res = eval(message.content.substring(PREFIX.length + 4));
        if (!res) res = 'No puedo traducir eso, prro.';
      } catch (error) {
        res = 'Ni para escribir una operación sirve, INUTIL.';
      }
      message.channel.send(res);
      break;

    case 'insulto':
      insulto(args, message);
      break;

    case 'hello':
      if (hour === 0) message.reply('Feliz hoy!');
      if (hour < 5) message.reply('A dormir, vag@ de mierda >:v');
      else if (hour < 12) message.reply('Wenos dias!');
      else if (hour < 18) message.reply('Wenas TARDES!');
      else message.reply('TARDE, COMO SIEMPRE...');
      break;

    case 'bye':
      if (hour === 0) message.reply('Feliz hoy!');
      if (hour < 5) message.reply('Porfin, maldit@ vag@');
      else if (hour < 12) message.reply('Pero apenas está amaneciendo :"v');
      else if (hour < 18) message.reply('Wena tarde mij@');
      else message.reply('Wenas nochesitas!');
      break;

    case 'help':
      var embed = new MessageEmbed()
        .setTitle('Comandos aceptados')
        .setColor(0x00cf2f).setDescription(`
          **!hello**  - Te saludo
          **!bye**    - Te despido
          **!own**    - Gatitos para el estrés
          **!sapo**   - Insulto a alguien por ti
          **!super**  - Te muestro un heroe para que salve tu dia
          **!sumar**  - Sumo por ti
          **!oper**   - Ejecuto cualquier operación aritmética y algo más, jeje
          **!insulto**- Genero un insulto 
					
					Covid:
					**!covid-col** - Reporte casos Colombia
					**!covid-global** - Reporte casos en el mundo
					`);
      message.channel.send(embed);
      break;

    case 'covid-col':
      covid.col().then((res) => {
        message.channel.send(res);
      });
      break;

    case 'covid-global':
      covid.global().then((res) => {
        message.channel.send(res);
      });
      break;

    case 'nice':
      message.channel.send('Que buen dato crack.');
      break;

    default:
      message.channel.send(
        'Ese comando no existe - **!help** para mas ayuda.',
      );
    }
});

bot.login(process.env.BOT_TOKEN);

// Antes de hacer un commit ejecutar 'npm run lint' please :3
