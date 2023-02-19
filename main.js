// get video element and button elements
const video = document.getElementById('video');
const flipButton = document.getElementById('flip-button');
const takePictureButton = document.getElementById('take-picture-button');
const retakePictureButton = document.getElementById('retake-picture-button');
const apiButton = document.getElementById('api-button');

// create video stream
navigator.mediaDevices.getUserMedia({video: true})
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.log(error);
  });

// flip camera functionality
let facingMode = 'user';
flipButton.addEventListener('click', () => {
  facingMode = facingMode === 'user' ? 'environment' : 'user';
  navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: facingMode } } })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(error => {
      console.log(error);
    });
});

// take picture functionality
takePictureButton.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const dataUrl = canvas.toDataURL('image/png');
  video.style.display = 'none';
  retakePictureButton.style.display = 'inline-block';
  takePictureButton.style.display = 'none';
  video.srcObject.getTracks().forEach(track => {
    track.stop();
  });
  const image = new Image();
  image.src = dataUrl;
  image.onload = () => {
    document.getElementById('video-container').appendChild(image);
  }
});

// retake picture functionality
retakePictureButton.addEventListener('click', () => {
  video.style.display = 'inline-block';
  takePictureButton.style.display = 'inline-block';
  retakePictureButton.style.display = 'none';
  document.getElementById('video-container').removeChild(document.querySelector('#video-container img'))
});

// display API code functionality
apiButton.addEventListener('click', () => {
  const form = document.createElement('form');
  form.setAttribute('onsubmit', 'mindeeSubmit(event)');
  const inputFile = document.createElement('input');
  inputFile.setAttribute('type', 'file');
  inputFile.setAttribute('id', 'my-file-input');
  inputFile.setAttribute('name', 'file');
  const submitButton = document.createElement('input');
  submitButton.setAttribute('type', 'submit');
  form.appendChild(inputFile);
  form.appendChild(submitButton);
  document.getElementById('button-container').appendChild(form);
});

// API code functionality
const mindeeSubmit = (evt) => {
  evt.preventDefault();
  let myFileInput = document.getElementById('my-file-input');
  let myFile = myFileInput.files[0];
  if (!myFile) { return; }
  let data = new FormData();
  data.append("document", myFile, myFile.name);

  let xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://api.mindee.net/v1/products/mindee/expense_receipts/v4/predict");
  xhr.setRequestHeader("Authorization", "62300b4895127eb01ff01cf7c1614417");
  xhr.send(data);
};
