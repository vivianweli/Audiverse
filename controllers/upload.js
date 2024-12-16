fs = require("fs");
const data = JSON.parse(fs.readFileSync('./data/sounds.json'));
const tags = data.tags; // Extract the "tags" array

exports.uploadPage =  function (req, res, next) {
    res.render("upload.ejs", { 'userid': session.userid, error: false, errorType: "default", currentRoute: '/upload', tags: tags});

};


// // Submit the form
// document.getElementById('upload-form').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const formData = new FormData(document.getElementById("upload-form"));
//     const audioFile = document.getElementById('audio-file').files[0];

//     // Include audio format
//     if (audioFile) {
//       const audioFormat = audioFile.type.split('/')[1];
//       formData.append('audioFormat', audioFormat);
//     }

//     // Submit data
//     try {
//       const response = await fetch('/upload', { 
//         method: 'POST',
//         body: formData
//       });

//       if (response.ok) {
//         alert('Audio uploaded successfully!');
//         window.location.href = '/'; // Redirect to homepage
//       } else {
//         alert('Error during upload.');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       alert('Error during upload.');
//     }
//   });
