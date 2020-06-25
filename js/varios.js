const axios = require('axios');
const { MessageEmbed } = require('discord.js');
 

const fetchHero = async (rand) => {
  try{
    const urlSuper = 'https://superheroapi.com/api/103623524740324/' + rand;
    const response = await axios.get(urlSuper);
    return response.data;
  } catch(e){
    console.log(e);
  }
};
const getHero = async() =>{
  var random = Math.floor(Math.random() * 879) + 1;
  var hero = await fetchHero(random);
  if(hero.response === 'success'){
    let embed = new MessageEmbed()
      .setTitle(hero.name)
      .setColor(0x3498db)
      .setDescription(
        `
        **Nombre**: ${hero.biography['full-name']}
        **Género**: ${hero.appearance.gender}
        **Raza**: ${hero.appearance.race}
        **De**: ${hero.biography.publisher}
        `,
      )
      .setImage(hero.image.url);
    return embed;
  }
};


let fetchInsult = async () =>{
  try{
    const urlInsultos = 'https://raw.githubusercontent.com/Somelx/Insultos/master/diccionario.txt';
    const response = await axios.get(urlInsultos);
    return response.data;
  } catch(e){
    console.log(e);
  }
};

let getInsult = async() =>{
  var insult = await fetchInsult();
  var random = Math.floor(Math.random() * 879) + 1;
  return insult.split('\n')[random];
};

module.exports = { getHero, getInsult };
