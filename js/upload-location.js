const API_KEY = '7ce0cf7b71044478b2daf6bacd2d578b';

// Initialize the map
const map = L.map('map').setView([0, 0], 2); // Vue globale
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function addSoundMarkers(sounds) {
  sounds.forEach(sound => {
    if (sound.location && sound.location.latitude && sound.location.longitude) {
      const { latitude, longitude, city, country } = sound.location;
      const popupContent = `
        <b>${sound.title}</b><br>
        <i>Uploaded by:</i> ${sound.uploader}<br>
        Location: ${city}, ${country}<br>
        <a href="/sound/${sound.id}">View Details</a>
      `;

      // Créer le marqueur
      const marker = L.marker([parseFloat(latitude), parseFloat(longitude)])
        .addTo(map)
        .bindPopup(popupContent);

      // Ajouter un événement pour recentrer et zoomer sur le marqueur au clic
      marker.on('click', () => {
        map.setView([parseFloat(latitude), parseFloat(longitude)], 8); // Centrer avec un zoom à 12
        marker.openPopup(); // Afficher le popup
      });
    }
  });
}

// Logique en fonction de la vue actuelle
if (currentRoute === '/') {
  // Si on est sur la page principale (index.ejs), afficher les marqueurs
  addSoundMarkers(filteredSounds);
} else if (currentRoute === '/upload') {
  // Si on est sur la page upload.ejs, permettre la sélection d'une localisation
  let marker;

  map.on('click', async (e) => {
    const { lat, lng } = e.latlng;
    const location = await getLocationFromCoordinates(lat, lng);
    if (location) {
      document.getElementById('location').value = location;
      document.getElementById('latitude').value = lat;
      document.getElementById('longitude').value = lng;

      // Ajouter un marqueur temporaire
      if (marker) map.removeLayer(marker);
      marker = L.marker([lat, lng]).addTo(map).bindPopup(location).openPopup();
    }
  });
}

// Fonction pour récupérer la localisation (OpenCage API)
async function getLocationFromCoordinates(lat, lng) {
  try {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      const city = result.components.city || result.components.town || result.components.village || 'Unknown City';
      const country = result.components.country || 'Unknown Country';
      return `${city}, ${country}`;
    }
  } catch (err) {
    console.error('Error during reverse geocoding:', err);
  }
  return null;
}