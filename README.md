# Audiverse

<img width="709" alt="image" src="https://github.com/user-attachments/assets/a1b93824-75a0-48d2-b275-947dbd7bcac2" />

## **Introduction**  
Audiverse is a collaborative platform designed to connect users worldwide through the sharing and discovery of unique soundscapes. This project emphasizes an immersive experience, where captured and shared sounds enhance our understanding and appreciation of the diversity of our planet.  

The main objective is to allow users to explore sounds recorded around the world via an interactive interface featuring a connected map and list. The platform also offers functionalities such as sound uploads, profile management, and role-specific interactions (logged-in vs non-logged-in users).  


## **Page Flow**  
<img width="571" alt="image" src="https://github.com/user-attachments/assets/211d9a66-dcad-4995-ae6a-d4a377fd661a" />

---

### **1. Navigation Bar**  
<img width="937" alt="image" src="https://github.com/user-attachments/assets/2f7db73b-2d37-4bd3-b032-ab6b2f2e973c" />

**Description:** The navigation bar showcases our platform name, provides access to different pages, and includes account management functions (login, logout, signup), and a search function.  

**Functionalities:**  
- **Accessing different pages**  
  - **For all users:** Displays access to Home Page.  
  - **For logged-in users:** Additionally displays access to My Profile Page and Upload Sound Page.  
- **Account management**  
  - **For all users:** Login and sign-up pop-up forms accessed via buttons.
  <img width="941" alt="image" src="https://github.com/user-attachments/assets/21790027-8c32-4254-8ade-558300d3cd66" />
  <img width="944" alt="image" src="https://github.com/user-attachments/assets/6608322d-959f-4fec-bd05-327e89a4601e" />

  - **For logged-in users:** Logout function accessible via a button.  
  - **Login error and sign-up success messages appear under the bar.**
  <img width="926" alt="image" src="https://github.com/user-attachments/assets/ecbc5459-f2ac-4bce-879e-781e57d97fd6" />

- **Search by sound title in the search bar across all available sounds**  
  - Navigates to the Search Results Page.  
- **UI Features:**  
  - Hovering over navigation items adds a blue shadow.  
  - The current active page is bolded in the navigation bar.  
  <img width="935" alt="image" src="https://github.com/user-attachments/assets/e113b543-37fe-47de-9d82-ff6d1a05a08d" />

---

### **2. Home Page (Main Page)**  
<img width="709" alt="image" src="https://github.com/user-attachments/assets/a1b93824-75a0-48d2-b275-947dbd7bcac2" />

**Description:** An interactive map (Leaflet) lets users discover sounds via markers. A corresponding sound list is displayed on the left. A search bar is available.  

**Functionalities:**  
- **Browse the sounds (as map markers) by navigating the map**  
  - Clicking on a marker opens a popup details pane with metadata including sound name, uploader name, location, and a hyperlink to the Sound Page.  
- **Browse the list of sounds**
  <img width="900" alt="image" src="https://github.com/user-attachments/assets/cb9eadf4-8b48-4df4-a8ab-bab1a156d7ab" />

  - Includes the sound name, uploader name, and associated tags.  
  - Browse by page (5 sounds per page).  
  - Browse by filtering sound tags.  
  - Clicking a sound name (hyperlink) navigates to the Sound Page.  

---

### **3. Upload Sound Page**  
<img width="908" alt="image" src="https://github.com/user-attachments/assets/89855869-098b-41d1-94f7-2c0772654c5c" />

**Description:** Allows logged-in users to add new sounds to the system.  

**Functionalities:**  
- Users fill out a form requiring a sound title and audio file upload. Tags can be applied (optional).  
- Users select a location on the map for the sound.  
- The uploader name is auto-filled as their username.  
- **Access restriction:**  
  - If a non-logged-in user tries to access this page via URL, they are redirected to the Home Page.  

---

### **4. Sound Page**  
<img width="854" alt="image" src="https://github.com/user-attachments/assets/5aa1bfe6-cd19-4e7b-b6ab-c6e57d3fc7ae" />

**Description:** Displays detailed information about a specific sound and allows listening.  

**Functionalities:**  
- Users can view sound metadata (title, uploader, location, upload time, and tags).  
- Users can play the sound file.  
- Users can see the sound’s location marker on the map.  

---

### **5. My Profile Page**  
<img width="927" alt="image" src="https://github.com/user-attachments/assets/85a38487-8893-4365-ad17-da4a68c18346" />

**Description:** Shows the user’s account information and all sounds they uploaded.  

**Functionalities:**  
- View personal details (username and email).  
- View uploaded sounds in a list format (same as Home Page).  
- Delete uploaded sounds.  
- All uploaded sounds are markerned to the map.  
- **Access restriction:**  
  - Non-logged-in users attempting to access this page via URL will be redirected to the Home Page.  

---

### **6. Search Result Page**  
<img width="929" alt="image" src="https://github.com/user-attachments/assets/59009ac4-46fc-4d20-a4d9-2feace2870e4" />

**Description:** Displays the user’s search query results.  

**Functionalities:**  
- View all sounds matching the query (displayed in a list like on the Home Page).  
- All searched sounds are markerned to the map.  

---

## **View Interactions**  

### **1. Map and List on Home Page, My Profile Page, and Search Results Page**  
- **Bidirectional interaction:** The map displays sound locations as markers.  
  - Clicking a marker on the map highlights the corresponding sound in the list on the left (auto-scroll down if necessary), opens the popup details and zooms the marker to the centre.
    <img width="930" alt="image" src="https://github.com/user-attachments/assets/f0afc093-3d0c-4de8-bb6f-5ddcce8c2fee" />

  - Hovering over a list item opens up the popup details of the marker on the map and the map shifts to show the marker in its view.
    
  <img width="931" alt="image" src="https://github.com/user-attachments/assets/253a5a85-db38-4f58-885a-de45b4f70aa5" />
    
  - Clicking a list item centers the marker on the map with the popup open.
  
  <img width="937" alt="image" src="https://github.com/user-attachments/assets/5016a813-6581-4184-832c-a29e258e3973" />


### **2. Map and Upload Location on Upload Page**  
- Users select a location on the map, and the selected marker's location auto-fills the “Location” field in the upload form.  

### **3. Map and Upload Location on Sound Page**  
- The location marker of the sound being played is visible on the map, with its popup open by default.  

---

## **User Management and Roles**  

### **1. Unregistered Users**  
- Can browse the map and listen to sounds.  
- Limited interface access (cannot view profiles, upload, or delete sounds).  

### **2. Regular Users**  
- Can browse the map and listen to sounds.  
- Can upload sounds, view their profile, and delete their own uploads.  


## **Data Structure**  

### **1. `sounds.json`**  
This JSON file contains two arrays: `sound` and `tags`.  

#### **Sound Object Properties:**  
- **ID:** Unique identifier generated based on upload time.  
- **Title:** Descriptive name of the sound.  
- **FilePath:** Uploaded audio file name on the server.  
- **Tags:** Associated categories (e.g., rain, traffic).  
- **Location:** Geographic coordinates (latitude, longitude, city, country).  
- **Upload DateTime:** Timestamp of the upload.  
- **Uploader:** Username of the uploader.  
- **Audio Format:** File type (e.g., MP3, WAV).  

#### **Tags (Predefined in Project):**  
- `"nature"`, `"forest"`, `"relaxing"`, `"water"`, `"ocean"`, `"urban"`, `"rain"`, `"animals"`, `"birds"`, `"wind"`, `"instrumental"`, `"classical"`, `"rock"`, `"ambient"`, `"white noise"`, `"thunderstorm"`, `"fireplace"`, `"cityscape"`, `"meditation"`, `"sports"`, `"traffic"`, `"festival"`, `"mountains"`  


### **2. `users.json`**  
Users are represented by the following properties:  
- **User ID:** User email.  
- **Username:** Defined by the user.  
- **Password:** Defined by the user.  


## **Technical Architecture**  

### **1. Backend:**  
- Developed using **Node.js**.  
- Handles user and sound management via a **REST API**.  
- Persistent data stored in a **JSON file (`sounds.json`)**.  
- **Express middleware** implements an MVC model.  

### **2. Frontend:**  
- **EJS** for dynamic views and base layout template.  
- **Leaflet.js** for the interactive map.  
- **CSS and JavaScript** for a responsive, user-friendly interface.  

### **3. Database:**  
- Sound data and users are stored in a **JSON format**.  
- Sound files are hosted **locally** for persistence.  

### **4. Authentication:**  
- **Session management** ensures secure user login and role-based access.  

---
## Made By
Vivian LI and Francisco AYORA DUARTE
