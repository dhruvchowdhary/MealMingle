const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Use HTML Media Capture API to access the camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error(error);
  });

// Capture a frame from the video stream at 1 second intervals
setInterval(() => {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  // Convert canvas to image
  const img = canvas.toDataURL('image/png');
  // Do something with the image data, such as send it to a server
  console.log(img);
}, 1000);
