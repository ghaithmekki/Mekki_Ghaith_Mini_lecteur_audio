let audio = document.getElementById("audio");
let playBtn = document.getElementById("play");
let nextBtn =document.getElementById("next");
let prevBtn=document.getElementById("prev");
let volume=document.getElementById("volume");
let title=document.getElementById("title");
let artist =document.getElementById("artist");


let tracks=[]
let current= 0;

fetch("tracks.json")
.then(res=>res.json())
.then(data=>{
    tracks=data;
    loadTrack(current);
});

function loadTrack(i){
    let track=tracks[i];
    audio.src = track.src;
    title.textContent = track.title;
    artist.textContent = track.artist;
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

nextBtn.addEventListener("click", ()=>{
    current=(current +1)% tracks.length;
    loadTrack(current);
    audio.play();
});

prevBtn.addEventListener("click", () =>{
    current=(current -1 + tracks.length)% tracks.length;
    loadTrack(current);
    audio.play();
});

volume.addEventListener("input", () =>{
    audio.volume = volume.value ;
});


let player =document.querySelector(".player");

audio.addEventListener("play",() => {
    player.classList.add("playing");
});

audio.addEventListener("pause", () => {
  player.classList.remove("playing");
});


