
const video = document.getElementById("camera");

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
    video.srcObject = stream;
    video.play();
    console.log("Camera stream started:", stream.getVideoTracks());
    })
    .catch(err => console.error("Camera error:", err));