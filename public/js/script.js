new WOW().init();

// Aplayer

const aplayer = document.querySelector("#aplayer");

if (aplayer) {
    const song = JSON.parse(aplayer.getAttribute("song"));
    const singer = JSON.parse(aplayer.getAttribute("singer"));

    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        audio: [{
            name: song.title,
            artist: singer.fullName,
            url: song.audio,
            cover: song.avatar,
        }],
        autoplay: true
    });

    const musicWheel = document.querySelector(".singer-detail .inner-play .inner-avatar");


    ap.on('play', function () {
        musicWheel.style.animationPlayState = "running";
    });


    ap.on('pause', function () {
        musicWheel.style.animationPlayState = "paused";
    });

}
// Aplayer


// Count tym

const buttonLike = document.querySelector("[button-like]");


if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const id = buttonLike.getAttribute("button-like");
        const status = buttonLike.classList.contains("active") ? "dislike" : "like"
        fetch(`/songs/like/${status}/${id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.code == 200) {
                    const likeNumber = document.querySelector("[like-number]");
                    if (parseInt(likeNumber.innerHTML) > data.like){
                        buttonLike.classList.remove("active")
                    }
                    else buttonLike.classList.add("active")
                    likeNumber.innerHTML = data.like;              
                }
            })
    })
}


// Count tym