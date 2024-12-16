  const API_KEY = '7ce0cf7b71044478b2daf6bacd2d578b';

  // Initialize the map
  const map = L.map('map').setView([0, 0], 2); // Global view
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  let marker;

  // Handle map click to get latitude and longitude
  map.on('click', async (e) => {
    const { lat, lng } = e.latlng;

    // Fetch city and country using reverse geocoding
    const location = await getLocationFromCoordinates(lat, lng);
    if (location) {
      document.getElementById('location').value = location;
      document.getElementById('latitude').value = lat;
      document.getElementById('longitude').value = lng;

      // Add marker
      if (marker) map.removeLayer(marker);
      marker = L.marker([lat, lng]).addTo(map).bindPopup(location).openPopup();
    }
  });

  // Fetch location data using OpenCage API
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

 