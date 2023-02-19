const startButton = document.getElementById('start-scanning');
const imageContainer = document.getElementById('image-container');

startButton.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = 'camera';
  input.addEventListener('change', () => {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result;
      imageContainer.appendChild(img);
    };
  });
  input.click();
});
