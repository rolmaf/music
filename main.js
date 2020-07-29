let width = window.innerWidth;

// if (width > ) {

// };

document.querySelector(".find-music__btn").addEventListener("click", searchMusic);

let result = document.querySelector(".find-music__result");

function searchMusic() {
    let searchText = document.querySelector(".find-music__input").value;
    let url = `https://api.lyrics.ovh/suggest/${searchText}`;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.send();

    xhr.onload = () => {
        let res = JSON.parse(xhr.response);
        if (res.total > 0) {
            console.log(res.total);
            let data = res.data;
            console.log(data);
            result.innerHTML = "";
            for (i of data) {
                result.innerHTML += `
                <div class="card">
                    <span class="artist">${i.artist.name}</span> - <span class="title">${i.title_short} 
                    <br> 
                    <a href="${i.link}"><button class="track-btn">Послушать</button></a>
                    
                    <button class="track-btn" onclick="moreDetails('${i.title}', '${i.artist.name}')">Подробнее</button>
                </div>
                <br>
                `;
            };

        } else {
            result.innerHTML = `
            <div class="card">
                Песня/Группа не найдена
            </div>
            `;
            console.log(res.total);
        };
    };
}

function moreDetails(song, artist) {
    result.innerHTML = "";
    document.querySelector(".find-music__body").style.width = "80vw";
    let xhr = new XMLHttpRequest();

    let url = `https://api.lyrics.ovh/v1/   ${artist}/${song}`;

    xhr.open("GET", url, true);

    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            let lyricsText = JSON.parse(xhr.response).lyrics;
            lyricsText.replace(/\n/g, '<br />');
            console.log(lyricsText);
            result.innerHTML = `
            <div class="lyrics">
                <div class="lyrics__body">
                    <span class="lyrics__artist">${artist}</span> - <span class="lyrics__title">${song}</span>
                    <div class="lyrics__parent-content">
                        <pre class="lyrics__content">${lyricsText}</pre>
                    </div>
                </div>
            </div>
            `;
        } else {
            result.innerHTML = `
            К сожалению информация не была найдена
            `;
        };

    };


}