import { renderMovies, renderListEmpty } from './html.js'

const apiKey = '7e14276a'
const filmList = document.getElementById('film-list')
const storedMovies = JSON.parse(localStorage.getItem('watchList'))

const fetchMovie = async () => {
    filmList.innerHTML = ''
    if(storedMovies.length > 0) {
        for(let movie of storedMovies) {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie}&plot=short`)
            const data = await res.json()
            filmList.innerHTML += renderMovies(data)
            localStorageHandler()
        } 
    } else {
        filmList.innerHTML = renderListEmpty()
    }
}

function localStorageHandler() {
    document.querySelectorAll(".watchlist-btn").forEach(item => {
        item.addEventListener('click', () => {
            let movieId = item.getAttribute('id')
            const movieIndex = storedMovies.indexOf(movieId)
            storedMovies.splice(movieIndex, 1)
            localStorage.setItem('watchList', JSON.stringify(storedMovies))
            fetchMovie()
        })
    })
}

fetchMovie()
