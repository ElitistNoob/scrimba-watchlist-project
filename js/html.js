const storedMovies = JSON.parse(localStorage.getItem('watchList')) || []

function renderMovies(data) {
    const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } = data
    return `
        <div class="movie [ flex-box ]">
            <img class="movie__poster" src="${Poster}">
            <div class="movie__container">
                <div class="movie__content [ flex-box ]">
                    <h3 class="movie__title [ fw-500 ]">${Title}</h3>
                    <p class="movie__rating"><span class="iconify" data-icon="bxs:star" style="color: #fec654;" data-width="16"></span>${imdbRating}</p>
                </div>
                <div class="movie__info [ flex-box ]">
                    <p class="movie__info-length">${Runtime}</p>
                    <p class="movie__info-type">${Genre}</p>
                    <div id="${imdbID}" class="watchlist-btn">
                        ${renderAddBtn(data)}
                    </div>
                </div>
                <p class="movie__synopsis">${Plot}..<a href="https://www.imdb.com/title/${imdbID}/" target="_blank"> Read more</a></p>
            </div>
        </div>
    `
}

function renderAddBtn(data) {
    const movieIndex = storedMovies.findIndex(id => id === data.imdbID)
    if(location.pathname === '/index.html') {
        if(movieIndex === -1) {
            return `<p><span class="iconify" data-icon="ant-design:plus-circle-filled" style="color: white;" data-width="16"></span> Watchlist</p>`
        } else {
            return `<p style="color: #fec654;"><span class="iconify" data-icon="teenyicons:tick-circle-solid" style="color: #fec654;" data-width="15"></span> Added</p>`
        }    
    } else {
        return `<p><span class="iconify" data-icon="ant-design:minus-circle-filled" style="color: white;" data-width="16"></span> Remove</p>`   
    }   
}

function renderError(data) {
    return `
        <div class="[ placeholder ][ flex-box fw-700 ]">
            <span class="iconify" data-icon="iconoir:file-not-found" style="color: #2e2e2f;" data-width="70"></span>
            <p class="page-placeholder">${data.Error}</p>
        </div>
    `
}

function renderListEmpty() {
    return `
        <div class="[ placeholder ][ flex-box fw-700 ]">
            <p class="page-placeholder">Your watchlist is looking a little empty...</p>
            <a href="index.html" class="empty-list"><span class="iconify" data-icon="ant-design:plus-circle-filled" style="color: white;" data-width="20"></span> let's add some movies!</a>
        </div>
    `
}

export { renderMovies, renderError, renderListEmpty }
