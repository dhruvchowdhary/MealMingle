const startButton = document.getElementById('upload-receipt');
const imageContainer = document.getElementById('image-container');
const confirmButton = document.getElementById('confirm-button');

startButton.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.addEventListener('change', () => {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result;
      imageContainer.appendChild(img);
      confirmButton.disabled = false;
    };
  });
  input.click();
});

confirmButton.addEventListener('click', () => {
  window.location.href = 'https://example.com/confirm';
});