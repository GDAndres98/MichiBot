const request = require('request');
const { MessageEmbed } = require('discord.js');

const urlGlobal = 'https://covidapi.info/api/v1/global';
const urlCol = 'https://covidapi.info/api/v1/country/COL/latest';
const urlDate = 'https://covidapi.info/api/v1/latest-date';

const options = { json: true };

// Fecha actual
const date = new Promise((res) => {
  request(urlDate, options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res(body);
    }
  });
});

// Reporte global
const global = new Promise((res) => {
  request(urlGlobal, options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const report = body.result;
      var embed = new MessageEmbed()
        .setTitle(`:earth_americas: GLOBAL :earth_asia:`)
        .setColor(0x3498db)
        .setDescription(
          `
          **Confirmados**: ${report.confirmed}
          **Muertes**: ${report.deaths}
          **Recuperados**: ${report.recovered}`,
        )
        .setFooter(`Reporte hasta el ${body.date}`)
        .setThumbnail(
          'https://images.vexels.com/media/users/3/157970/isolated/preview/c156b4270aea292b9b335dd463ea17eb-icono-de-planeta-tierra-icono-de-planeta-tierra-by-vexels.png',
        );
      res(embed);
    }
  });
});

// Reporte Colombia
const col = new Promise((res) => {
  request(urlCol, options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      date.then((currentDate) => {
        const report = body.result[currentDate];
        var embed = new MessageEmbed()
          .setTitle(`:flag_co: COLOMBIA :flag_co:`)
          .setColor(0xffff00)
          .setDescription(
            `
            **Confirmados**: ${report.confirmed}
            **Muertes**: ${report.deaths}
            **Recuperados**: ${report.recovered}`,
          )
          .setFooter(`Reporte hasta el ${currentDate}`)
          .setThumbnail(
            'https://vectorflags.s3.amazonaws.com/flags/co-circle-01.png',
          );
        res(embed);
      });
    }
  });
});

// Exportar
module.exports = { global, col };
