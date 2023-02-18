const video = document.getElementById('video-stream');
		const flipButton = document.getElementById('flip-button');
		const takePhotoButton = document.getElementById('take-photo-button');
		const retakePhotoButton = document.getElementById('retake-photo-button');
		const uploadFileInput = document.getElementById('upload-file');
		const uploadButton = document.getElementById('upload-button');

		let isFrontCamera = true;
		let stream;

		// function to handle flipping the camera
		function flipCamera() {
			isFrontCamera = !isFrontCamera;
			startCamera();
		}

		// function to handle taking a photo
		function takePhoto() {
			const canvas = document.createElement('canvas');
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
			const photoURL = canvas.toDataURL('image/png');
			video.style.display = 'none';
			const photo = new Image();
			photo.src = photoURL;
			photo.onload = () => {
				photo.style.width = '100%';
				video.parentNode.insertBefore(photo, video);
			}
		}

		// function to handle retaking a photo
		function retakePhoto() {
			video.style.display = 'block';
			video.parentNode.removeChild(document.querySelector('img'));
			startCamera();
		}

		// function to handle uploading an image
		function uploadImage() {
			uploadFileInput.click();
		}

		// function to handle selecting a file to upload
		function handleFileSelect(event) {
			const file = event.target.files[0];
			if (file.type.match('image.*')) {
				const reader = new FileReader();
				reader.onload = (readerEvent) => {
					video.style.display = 'none';
					const photo = new Image();
					photo.src = readerEvent.target.result;
					photo.onload = () => {
						photo.style.width = '100%';
						video.parentNode.insertBefore(photo, video);
					}
				};
				reader.readAsDataURL(file);
			}
		}

		// function to start the camera
		async function startCamera() {
			if (stream) {
				stream.getTracks().forEach(track => track.stop());
			}

			try {
				stream = await navigator.mediaDevices.getUserMedia({
					video: {
						facingMode: isFrontCamera ? 'user' : 'environment'
					}
				});
				video.srcObject = stream;
			} catch (error) {
				console.error(error);
			}
		}

		// initialize the camera and attach event listeners to the buttons
		startCamera();
		flipButton.addEventListener('click', flipCamera);
		takePhotoButton.addEventListener('click', takePhoto);
		retakePhotoButton.addEventListener('click', retakePhoto);
		uploadButton.addEventListener('click', uploadImage);
        uploadFileInput.addEventListener('change', handleFileSelect);