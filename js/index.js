import { renderMovies, renderError } from './html.js'

const apiKey = '7e14276a'
const filmList = document.getElementById('film-list')
const searchBox = document.getElementById('search-box')
const submitBtn = document.getElementById('submit-btn')
let storedMovies = JSON.parse(localStorage.getItem('watchList')) || []

submitBtn.addEventListener('click', async () => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}
    &s=${searchBox.value}&type=movie`)
    const data = await res.json()
    filmList.innerHTML = ''
    
    if(data.Response === "True") {
        data.Search.forEach( async i =>  {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${i.imdbID}&plot=short`)
            const data = await res.json()
            filmList.innerHTML += renderMovies(data)
            localStorageHandler()
        })      
   } else {
        filmList.innerHTML += renderError(data)
   }
})

function localStorageHandler() {
    document.querySelectorAll(".watchlist-btn").forEach(item => {
        item.addEventListener('click', () => {
            const movieId = item.getAttribute('id')
            const movieIndex = storedMovies.findIndex(id => id === movieId)
            if(movieIndex === -1) {
                storedMovies.push(movieId)
                document.getElementById(`${movieId}`).innerHTML = `
                <p style="color: #fec654;">
                    <span class="iconify" data-icon="teenyicons:tick-circle-solid" style="color: #fec654;" data-width="15"></span> 
                    Added
                </p>
            `
            } else {
                storedMovies.splice(movieIndex, 1)
                document.getElementById(`${movieId}`).innerHTML = `
                <p><span class="iconify" data-icon="ant-design:plus-circle-filled" style="color: white;" data-width="16"></span> Watchlist</p>
            `
            } 
            localStorage.setItem('watchList', JSON.stringify(storedMovies))
        })
    })
}
