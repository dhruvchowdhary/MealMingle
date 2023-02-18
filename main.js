const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const flipButton = document.getElementById('flip-button');

// Use HTML Media Capture API to access the camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error(error);
  });

// Flip the camera when the button is clicked
flipButton.addEventListener('click', () => {
  // Get a list of available video input devices
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      // Find the video input device that is not the current device
      const currentDeviceId = video.srcObject.getVideoTracks()[0].getSettings().deviceId;
      const nextDevice = devices.find(device => device.kind === 'videoinput' && device.deviceId !== currentDeviceId);
      if (nextDevice) {
        // Use the next device to create a new video stream
        const constraints = {
          video: {
            deviceId: { exact: nextDevice.deviceId }
          }
        };
        navigator.mediaDevices.getUserMedia(constraints)
          .then(stream => {
            video.srcObject = stream;
          })
          .catch(error => {
            console.error(error);
          });
      }
    })
    .catch(error => {
      console.error(error);
    });
});

// Capture a frame from the video stream at 1 second intervals
setInterval(() => {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  // Convert canvas to image
  const img = canvas.toDataURL('image/png');
  // Do something with the image data, such as send it to a server
  console.log(img);
}, 1000);
