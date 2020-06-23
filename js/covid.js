const axios = require('axios');
const { MessageEmbed } = require('discord.js');

const urlGlobal = 'https://covidapi.info/api/v1/global';
const urlCol = 'https://covidapi.info/api/v1/country/COL/latest';
const urlDate = 'https://covidapi.info/api/v1/latest-date';

// Fecha actual
const date = new Promise((resolve) => {
  axios.get(urlDate).then((response) => {
    resolve(response);
  });
});

// Reporte global
const global = new Promise((resolve) => {
  axios.get(urlGlobal).then((response) => {
    const report = response.data.result;
    var embed = new MessageEmbed()
      .setTitle(`:earth_americas: GLOBAL :earth_asia:`)
      .setColor(0x3498db)
      .setDescription(
        `
          **Confirmados**: ${report.confirmed}
          **Muertes**: ${report.deaths}
          **Recuperados**: ${report.recovered}`,
      )
      .setFooter(`Reporte hasta el ${response.data.date}`)
      .setThumbnail(
        'https://images.vexels.com/media/users/3/157970/isolated/preview/c156b4270aea292b9b335dd463ea17eb-icono-de-planeta-tierra-icono-de-planeta-tierra-by-vexels.png',
      );
    resolve(embed);
  });
});

// Reporte Colombia
const col = new Promise((resolve) => {
  axios.get(urlCol).then((response) => {
    date.then((currentDate) => {
      const report = response.data.result[currentDate.data];
      var embed = new MessageEmbed()
        .setTitle(`:flag_co: COLOMBIA :flag_co:`)
        .setColor(0xffff00)
        .setDescription(
          `
          **Confirmados**: ${report.confirmed}
          **Muertes**: ${report.deaths}
          **Recuperados**: ${report.recovered}`,
        )
        .setFooter(`Reporte hasta el ${currentDate.data}`)
        .setThumbnail(
          'https://vectorflags.s3.amazonaws.com/flags/co-circle-01.png',
        );
      resolve(embed);
    });
  });
});

// Exportar
module.exports = { global, col };
