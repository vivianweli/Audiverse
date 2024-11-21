document.getElementById('uploadBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('audioUpload');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('audio', file);

        // Upload the file to the servernpm install cors
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        

        const data = await response.json();
        const audioUrl = data.filePath;

        // Add an audio player for the uploaded file
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.src = audioUrl;

        const audioList = document.getElementById('audioList');
        const audioItem = document.createElement('div');
        audioItem.appendChild(audioElement);

        audioList.appendChild(audioItem);
    } else {
        alert('Please select an audio file to upload!');
    }
});
