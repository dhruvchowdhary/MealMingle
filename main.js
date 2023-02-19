const scanBtn = document.getElementById('scan-btn');
const imageContainer = document.getElementById('image-container');

scanBtn.addEventListener('click', () => {
  // Prompt the user to take a photo, choose from camera roll, or upload from files
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = 'environment';
  input.onchange = (event) => {
    // Display the selected image on the screen
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target.result;
      imageContainer.innerHTML = '';
      imageContainer.appendChild(img);
    };
  };
  input.click();
});
