let audio = document.getElementById("audio");
let playBtn = document.getElementById("play");
let nextBtn =document.getElementById("next");
let prevBtn=document.getElementById("prev");
let volume=document.getElementById("volume");
let title=document.getElementById("title");
let artist =document.getElementById("artist");
let cover = document.getElementById("cover");


let tracks=[]
let current= 0;

fetch("tracks.json")
.then(res=>res.json())
.then(data=>{
    tracks=data;
    loadTrack(current);
    renderPlaylist();
});

function loadTrack(index) {
  let track = tracks[index];

  audio.src = track.src;
  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;
}

playBtn.addEventListener("click",() =>{
    if (audio.paused){
        audio.play();
        playBtn.textContent = "⏸";
    }else{
        audio.pause();
        playBtn.textContent = "▶️";
    }
});

audio.addEventListener("play", () => {
  playBtn.textContent = "⏸";
});

audio.addEventListener("pause", () => {
  playBtn.textContent = "▶️";
});

nextBtn.addEventListener("click", () => {
  current = (current + 1) % tracks.length;
  loadTrack(current);
  audio.play();
  updateActiveTrack();
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + tracks.length) % tracks.length;
  loadTrack(current);
  audio.play();
  updateActiveTrack();
});
volume.addEventListener("input", () => {
  audio.volume = volume.value;

  if (volume.value == 0) {
    volumeIcon.textContent = "🔇";
  } else if (volume.value < 0.5) {
    volumeIcon.textContent = "🔉";
  } else {
    volumeIcon.textContent = "🔊";
  }
});


let player =document.querySelector(".player");

audio.addEventListener("play",() => {
    player.classList.add("playing");
});

audio.addEventListener("pause", () => {
  player.classList.remove("playing");
});


let progress = document.getElementById("progress");

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

let volumeIcon = document.getElementById("volume-icon");




let playlistDiv = document.getElementById("playlist");

function renderPlaylist() {
  playlistDiv.innerHTML = "";

  tracks.forEach((track, index) => {
    let div = document.createElement("div");
    div.classList.add("track");

    div.innerHTML = `
      <strong>${track.title}</strong><br>
      <small>${track.artist}</small>
    `;

    // click → play track
    div.addEventListener("click", () => {
      current = index;
      loadTrack(current);
      audio.play();
      updateActiveTrack();
    });

    playlistDiv.appendChild(div);
  });
}

function updateActiveTrack() {
  let allTracks = document.querySelectorAll(".track");

  allTracks.forEach((el, index) => {
    el.classList.toggle("active", index === current);
  });
}



 