async function getISS() {
    
    try{ 
        const request = await fetch('http://api.open-notify.org/iss-now.json', );
        const data = await request.json();

        const { latitude, longitude } = data.iss_position;
        return [parseFloat(latitude), parseFloat(longitude)];
    
    } catch (error) {
        console.log('Error', error);
    }
}

//Map
//var map = L.map("map").setView([51.505, -0.09], 13); <-- fait un setView sur londres en premier 
var map = L.map("map"); // <-- va direct aux coordonnées de l'ISS



L.tileLayer(
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 19,
    attribution: "ArcGIS",
  }
).addTo(map);

//marker
var marker;

var starship = L.icon({
  iconUrl: "/Ressources/iss.png",
  //shadowUrl: "",

  iconSize: [38, 95], // size of the icon
  //shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
}); 

getISS().then((coordinates) => {
  map.setView(coordinates, 6); //avant d'aller aux coordonnées de l'ISS
  marker = L.marker(coordinates, { icon: starship }).addTo(map);

  // Update coordinatesDiv avec les coordonnées de base quand on ouvre la page
  var latitude = coordinates[0];
  var longitude = coordinates[1];
  coordinatesDiv.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
});


//refresh

var coordinatesDiv = document.getElementById("localisation");

setInterval(() => {
  getISS().then((coordinates) => {
    marker.setLatLng(coordinates);
    map.setView(coordinates, 6);

    // Update the coordinatesDiv
    var latitude = coordinates[0];
    var longitude = coordinates[1];
    coordinatesDiv.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
  });
}, 5000);
