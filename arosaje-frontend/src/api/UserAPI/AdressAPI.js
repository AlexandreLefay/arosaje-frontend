export const coordinateAPI = async (props) =>{
  let x = '';
  let y = '';
  let coordinateError = '';
  const URL = "https://api-adresse.data.gouv.fr/search/?q=";
  //Use API : https://adresse.data.gouv.fr/api-doc/adresse
  // => return coordinate from an address in France.
  const streetWithoutBlank = props.street.replace(/ /g, "%20")
  const cityWithoutBlank= props.city.replace(/ /g, "%20")

  await fetch(URL + streetWithoutBlank + '%2C%20' + cityWithoutBlank + '&type=housenumber').then(response => {
    if (!response.ok) {
      throw new Error('La requête a échoué');
    }
    return response.json();
    }).then(data => {
      x = data.features[0].geometry.coordinates[0];
      y = data.features[0].geometry.coordinates[1];
    }).catch(error => {
      console.log("Erreur lors de la récupération des coordonnées : " + error);
      coordinateError = 'La requête a échoué';
      x = 0;
      y = 0;
    });
    return ({x: x, y: y, coordinateError: coordinateError})
  }