//leaflet.js
//setting up the map at lat: 1 long : 1 using mapbox
const mymap = L.map("iss-map").setView([1, 1], 1);
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 1,
    id: "mapbox.streets",
    accessToken:
      //this access token won't work, replace it by yours
      "pk.eyJ1IjoiYW50b2luZWZzZyIsImEiOiJjanowOTJnN2EwOWhtM2dtcjI3ODI4YXplIn0.sltpQmpgm-ZfV4cdeE_zYg"
  }
).addTo(mymap);
//setting up a marker for the ISS
var myIcon = L.icon({
  iconUrl: "./img/iss.png",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [-3, -15]
});
const marker = L.marker([1, 1], {
  icon: myIcon
}).addTo(mymap);

async function getIssData() {
  endpoint = "https://api.wheretheiss.at/v1/satellites/25544";
  const IssData = await fetch(endpoint).then(response => response.json());
  console.log(IssData);
  //const latitude = IssData.latitude;
  //const longitude = IssData.longitude;
  //destructuring, convenient way to extract data from an object
  const { latitude, longitude } = IssData;
  console.log("latitude : " + latitude + " longitude : " + longitude);
  //printing long and lat
  document.getElementById("latitude").innerText = "Latitude : " + latitude;
  document.getElementById("longitude").innerText = "Longitude : " + longitude;
  //updating the ISS marker position
  marker.setLatLng([latitude, longitude]);
  //marking trajectory
  const trajectory = L.circle([1, 1], {
    color: "magenta",
    fillColor: "#FF00FF",
    fillOpacity: 0.3,
    radius: 500
  }).addTo(mymap);
  trajectory.setLatLng([latitude, longitude]);
}

window.setInterval(getIssData, 1000);
