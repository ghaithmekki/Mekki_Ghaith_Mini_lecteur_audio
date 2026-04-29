/**  On récupère tous les éléments HTML
 *  par leur ID pour les manipuler*/
let audio = document.getElementById("audio");

let playBtn = document.getElementById("play");
let nextBtn =document.getElementById("next");
let prevBtn=document.getElementById("prev");
let volume=document.getElementById("volume");
let volumeIcon = document.getElementById("volume-icon");

let title=document.getElementById("title");
let artist =document.getElementById("artist");
let cover = document.getElementById("cover");

let currentTimeEl = document.getElementById("current-time");
let durationEl = document.getElementById("duration");
let progress = document.getElementById("progress");

let player =document.querySelector(".player");
let playlistDiv = document.getElementById("playlist");


let tracks=[]  // Contient la liste des chansons chargée depuis le JSON
let current= 0; // Contiendra la liste des chansons chargée depuis le JSON


//Utilisation de Fetch pour récupérer le fichier de configuration JSON
fetch("tracks.json")
.then(res=>res.json())
.then(data=>{
    tracks=data;
    loadTrack(current);
    renderPlaylist();   // Génère visuellement la liste
});

// Injecte les données d'un morceau (image, texte, fichier) dans le lecteur
function loadTrack(index) {
  let track = tracks[index];

  audio.src = track.src;
  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;
}

// Gère le basculement entre Lecture et Pause
playBtn.addEventListener("click",() =>{
    if (audio.paused){
        audio.play();
        playBtn.textContent = "⏸";
    }else{
        audio.pause();
        playBtn.textContent = "⏵";
    }
});

// Écouteurs d'états pour mettre à jour l'icône du bouton dynamiquement
audio.addEventListener("play", () => {
  playBtn.textContent = "⏸";
});

audio.addEventListener("pause", () => {
  playBtn.textContent = "⏵";
});

// Passage au morceau suivant (boucle à la fin grâce au modulo %)
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
// Mise à jour de l'icône
  if (volume.value == 0) {
    volumeIcon.textContent = "🔇";
  } else if (volume.value < 0.5) {
    volumeIcon.textContent = "🔉";
  } else {
    volumeIcon.textContent = "🔊";
  }
});




audio.addEventListener("play",() => {
    player.classList.add("playing");
});

audio.addEventListener("pause", () => {
  player.classList.remove("playing");
});


// Permet à l'utilisateur de cliquer sur la barre pour changer le moment de lecture
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});


// Crée les éléments HTML de la liste de lecture
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

// Met à jour l'apparence visuelle (surbrillance) dans la liste
function updateActiveTrack() {
  let allTracks = document.querySelectorAll(".track");

  allTracks.forEach((el, index) => {
    el.classList.toggle("active", index === current);
  });
}

// Formate les secondes en format MM:SS
function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
}

// Met à jour la barre et le texte pendant la lecture
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

// Affiche la durée totale une fois le fichier chargé
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Lecture automatique du morceau suivant à la fin
audio.addEventListener("ended", () => {
  nextBtn.click();
});