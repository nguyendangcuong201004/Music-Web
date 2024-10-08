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

// Favorite Song

const buttonFavorite = document.querySelector("[button-favorite]");

if (buttonFavorite){
    buttonFavorite.addEventListener("click", () => {
        const id = buttonFavorite.getAttribute("button-favorite");
        const status = buttonFavorite.classList.contains("active") ? "unfavorite" : "favorite";

        fetch(`/songs/favorite/${status}/${id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                if (data.code == 200){
                    buttonFavorite.classList.toggle("active")
                    const content = buttonFavorite.querySelector("span");

                    if (data.message == "Đã thêm vào thư viện"){
                        content.innerHTML = "Xóa khỏi Thư viện"
                    }
                    else {
                        content.innerHTML = "Lưu vào thư viện"
                    }
                }
            })
    })
}

// Favorite Song 

// Search suggest

const boxSearch = document.querySelector(".box-search");
if (boxSearch){
    const input = boxSearch.querySelector('input[name="keyword"]');
    const innerList = boxSearch.querySelector(".inner-list");
    const innerSuggest = boxSearch.querySelector(".inner-suggest");
    input.addEventListener("keyup", (e) => {
        const keyword = input.value;

        if (!keyword || keyword == "" || !e.target.value || e.target.value == ""){
            innerList.innerHTML = "";
            innerSuggest.classList.remove("show")
            return;
        }

        fetch(`/search/suggest?keyword=${keyword}`)
            .then(res => res.json())
            .then(data => {
                if (data.code == 200){
                    const songs = data.songs
                    if (songs.length > 0){
                        const htmlArray = songs.map((song) => {
                            return `
                            <a class="inner-item" href="/songs/detail/${song.slug}">
                                <div class="inner-image">
                                    <img src="${song.avatar}" alt="">
                                </div>
                                <div class="inner-info">
                                    <div class="inner-title">${song.title}</div>
                                    <div class="inner-singer">${song.singer.fullName}</div>
                                </div>
                            </a>
                            `
                        })
                        innerList.innerHTML = htmlArray.join("");
                        innerSuggest.classList.add("show")
                    }
                    else {
                        innerList.innerHTML = "";
                        innerSuggest.classList.remove("show")
                    }             
                }
            })
    })
    input.addEventListener("focus", (e) => {
        fetch(`/search/suggest?keyword=${e.target.value}`)
            .then(res => res.json())
            .then(data => {
                if (data.code == 200){
                    const songs = data.songs
                    innerList = boxSearch.querySelector(".inner-list");
                    innerSuggest = boxSearch.querySelector(".inner-suggest");
                    if (songs.length > 0){
                        const htmlArray = songs.map((song) => {
                            return `
                            <a class="inner-item" href="/songs/detail/${song.slug}">
                                <div class="inner-image">
                                    <img src="${song.avatar}" alt="">
                                </div>
                                <div class="inner-info">
                                    <div class="inner-title">${song.title}</div>
                                    <div class="inner-singer">${song.singer.fullName}</div>
                                </div>
                            </a>
                            `
                        })
                        innerList.innerHTML = htmlArray.join("");
                        innerSuggest.classList.add("show")
                    }
                    else {
                        innerList.innerHTML = "";
                        innerSuggest.classList.remove("show")
                    }
                }
            })
    })
}

// Search suggest
