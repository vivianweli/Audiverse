const API_KEY = '7ce0cf7b71044478b2daf6bacd2d578b';

// Initialize the map
const map = L.map('map').setView([0, 0], 2); // Vue globale
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);



// Logique en fonction de la vue actuelle
if (currentRoute === '/') {
  const markers = {};
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
          map.flyTo([parseFloat(latitude), parseFloat(longitude)], 6); // Centrer avec un zoom à 6
          marker.openPopup(); // Afficher le popup
          document.querySelectorAll('.audio-item').forEach(item => {
            item.classList.remove('highlight');
          });
      
          // Highlight the corresponding list item
          const listItem = document.querySelector(`.audio-item[data-id="${sound.id}"]`);
          if (listItem) {
            listItem.classList.add('highlight');
            listItem.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll to the list item
          }
        });
        markers[sound.id] = marker;
      }
    });
  }
  // Si on est sur la page principale (index.ejs), afficher les marqueurs
  addSoundMarkers(filteredSounds);
  document.querySelectorAll('.audio-item').forEach(item => {
    const soundId = item.querySelector('a').href.split('/').pop(); 
    item.addEventListener('mouseover', () => {
      if (markers[soundId] && !markers[soundId]._popup._isOpen) {  
        //map.flyTo(markers[soundId].getLatLng(), 8);  
        markers[soundId].openPopup();
        document.querySelectorAll('.audio-item').forEach(item => {
          item.classList.remove('highlight');
        });
      }
    });
    
    item.addEventListener('mouseout', () => {
      if (markers[soundId] && !markers[soundId]._popup._isOpen) {  
      }
    });
    
    item.addEventListener('click', () => {
      if (markers[soundId]) {
        markers[soundId].openPopup();
    
        markers[soundId]._popup._isOpen = true;
    
        map.flyTo(markers[soundId].getLatLng(), 6);  
    
      }
    });
    
    map.on('popupclose', (event) => {
      if (event.popup && event.popup._isOpen) {
        event.popup._isOpen = false;
      }
    });
  });
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

}else if (currentRoute === '/profile') {
  const markers = {}; // Object to store markers by sound ID

  function addUserSoundMarkers(sounds) {
    sounds.forEach(sound => {
      if (sound.location && sound.location.latitude && sound.location.longitude) {
        const { latitude, longitude, city, country } = sound.location;
        const popupContent = `
          <b>${sound.title}</b><br>
          Location: ${city}, ${country}<br>
          <a href="/sound/${sound.id}">View Details</a>
        `;
        
        // Create the marker and add to the map
        const marker = L.marker([parseFloat(latitude), parseFloat(longitude)])
          .addTo(map)
          .bindPopup(popupContent);
          
          marker.on('click', () => {
            map.flyTo([parseFloat(latitude), parseFloat(longitude)], 6);
            // Remove highlight from all items
            document.querySelectorAll('.audio-item').forEach(item => {
              item.classList.remove('highlight');
            });
    
            // Highlight the corresponding list item
            const listItem = document.querySelector(`.audio-item[data-id="${sound.id}"]`);
            if (listItem) {
              listItem.classList.add('highlight');
              listItem.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll to the list item
            }
          });
        // Store the marker by sound ID
        markers[sound.id] = marker;
      }
    });
  }

  addUserSoundMarkers(userSounds);

  document.querySelectorAll('.audio-item').forEach(item => {
    const soundId = item.querySelector('a').href.split('/').pop(); 

    item.addEventListener('mouseover', () => {
      if (markers[soundId] && !markers[soundId]._popup._isOpen) {  
        document.querySelectorAll('.audio-item').forEach(item => {
          item.classList.remove('highlight');
        });
        const listItem = document.querySelector(`.audio-item[data-id="${sound.id}"]`);
        if (listItem) {
          listItem.classList.add('highlight');
          listItem.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll to the list item
        }
        markers[soundId].openPopup();
      }
    });
    
    item.addEventListener('mouseout', () => {
      if (markers[soundId] && !markers[soundId]._popup._isOpen) {  
      }
    });
    
    item.addEventListener('click', () => {
      if (markers[soundId]) {
        markers[soundId].openPopup();
    
        markers[soundId]._popup._isOpen = true;
    
        map.flyTo(markers[soundId].getLatLng(), 8);  
    
      }
    });
    
    map.on('popupclose', (event) => {
      if (event.popup && event.popup._isOpen) {
        event.popup._isOpen = false;
      }
    });
  });
}else if (currentRoute === '/sound') {

  //const soundsData = JSON.parse(JSON.parse(fs.readFileSync('./data/sounds.json'))).sounds.find(audio => audio.id == id);
  if (userSounds.location && userSounds.location.latitude && userSounds.location.longitude) {
    const { latitude, longitude, city, country } = userSounds.location;
    const popupContent = `
      <b>${userSounds.title}</b><br>
      <i>Uploaded by:</i> ${userSounds.uploader}<br>
      Location: ${city}, ${country}<br>
      <a href="/sound/${userSounds.id}">View Details</a>
    `;

    // Créer le marqueur
    const marker = L.marker([parseFloat(latitude), parseFloat(longitude)])
      .addTo(map)
      .bindPopup(popupContent);

    // Centrer et zoomer sur le marqueur
    map.setView([parseFloat(latitude), parseFloat(longitude)], 6);
    marker.openPopup();
  }
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