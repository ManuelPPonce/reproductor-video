const video = document.getElementById('video');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const mute = document.getElementById('mute');
const volUp = document.getElementById('volUp');
const volDown = document.getElementById('volDown');
const speedUp = document.getElementById('speedUp');
const speedDown = document.getElementById('speedDown');
const sizeUp = document.getElementById('sizeUp');
const sizeDown = document.getElementById('sizeDown');
const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const capture = document.getElementById('capture');
const selector = document.getElementById('videoSelector');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const videos = ['video1.mp4', 'video2.mp4', 'video3.mp4'];
let currentVideo = 0;

play.onclick = () => video.play();
pause.onclick = () => video.pause();
mute.onclick = () => video.muted = !video.muted;
volUp.onclick = () => video.volume = Math.min(video.volume + 0.1, 1);
volDown.onclick = () => video.volume = Math.max(video.volume - 0.1, 0);
speedUp.onclick = () => video.playbackRate += 0.1;
speedDown.onclick = () => video.playbackRate = Math.max(0.1, video.playbackRate - 0.1);
sizeUp.onclick = () => 
{

    video.width += 20;
} 
sizeDown.onclick = () => video.width = Math.max(100, video.width - 20);

progress.oninput = () => video.currentTime = video.duration * (progress.value / 100);
video.ontimeupdate = () => progress.value = (video.currentTime / video.duration) * 100;

selector.onchange = (e) => {
  video.src = e.target.value;
  video.load();
  video.play();
};

prev.onclick = () => {
  currentVideo = (currentVideo - 1 + videos.length) % videos.length;
  selector.value = videos[currentVideo];
  selector.dispatchEvent(new Event('change'));
};

next.onclick = () => {
  currentVideo = (currentVideo + 1) % videos.length;
  selector.value = videos[currentVideo];
  selector.dispatchEvent(new Event('change'));
};

capture.onclick = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  const img = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = img;
  link.download = 'captura.png';
  link.click();
};