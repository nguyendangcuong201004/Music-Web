new WOW().init();

// Aplayer

const aplayer = document.querySelector("#aplayer");

const song = JSON.parse(aplayer.getAttribute("song"));
const singer = JSON.parse(aplayer.getAttribute("singer"));

console.log(song);
console.log(singer);

const ap = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [{
        name: song.title,
        artist: singer.fullName,
        url: song.audio,
        cover: song.avatar,
    }],
});


// Aplayer