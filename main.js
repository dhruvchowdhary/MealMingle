const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureBtn = document.getElementById('capture-btn');

captureBtn.addEventListener('click', () => {
  // Use HTML Media Capture API to access the camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      // Display the video stream on the canvas
      const video = document.createElement('video');
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Stop the camera stream
        stream.getTracks().forEach(track => track.stop());
        // Convert canvas to image
        const img = canvas.toDataURL('image/png');
        // Do something with the image data, such as send it to a server
        console.log(img);
      }
    })
    .catch(error => {
      console.error(error);
    });
});
