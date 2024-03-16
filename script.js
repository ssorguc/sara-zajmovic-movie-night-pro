'use strict';

//Global variables
const popularURL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`;

fetch(popularURL, options).then((response) => response.json()).then((data) => {
  //throw new Error("Error")
  let movies = data.results;
  let brojCol = 1;

  for (let i = 0; i < 4; i++) {
    const singleMovie = `
        <div class="main-container" onclick="openDetails(${movies[i].id})">
        <div class="poster-container">
            <a href="#"><img src="https://image.tmdb.org/t/p/original/${movies[i].poster_path}" class="poster" /></a>
        </div>
        <div class="ticket-container">
            <div class="ticket__content">
                <h4 class="ticket__movie-title">${movies[i].title}</h4>
                              
                <p class="ticket__old-price"><i class="fa-regular fa-star" style="color: #FFD43B;"></i> ${movies[i].vote_average}</p>
                <p class="ticket__current-price"> $5</p>
                <button class="ticket__buy-btn">Wish list</button>
            </div>
        </div>
    </div>
            `;
    document.getElementById(brojCol)?.insertAdjacentHTML('afterbegin', singleMovie);
    brojCol++;
  }
}).catch(err => {
  const toastLiveExample = document.getElementById("liveToast");
  document.getElementById("error-message").innerHTML = err.message;
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
});


const loadingImg = document.createElement("img");
loadingImg.src = "assets/loading.gif";
loadingImg.style.width = "60px";
const resultDiv = document.getElementById("result");
const moviesFound = document.createElement("p");

function searchMovies() {
  const searchWord = document.getElementById("searchInput").value;
  if (searchWord === "" || searchWord === null || searchWord === undefined) {
    moviesFound.innerHTML = "Enter a valid search word";
    resultDiv.appendChild(moviesFound);
  } else {
    moviesFound.innerHTML = "";
    resultDiv.appendChild(loadingImg);
    setTimeout(delayedLoading, 2000);
  }
}

function delayedLoading() {
  resultDiv.removeChild(loadingImg);
  const searchWord = document.getElementById("searchInput").value;
  let searchURL = `https://api.themoviedb.org/3/search/movie?query=%22${searchWord}%22&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

  fetch(searchURL, options).then((response) => response.json()).then((data) => {
    const pronadeniFilmovi = data.results;
    pronadeniFilmovi.forEach((movie) => {
      const templ = `<div onclick="openDetails(${movie.id})"class="card mx-auto mt-3" style="max-width: 540px;"> 
        <div class="row no-gutters">
            <div class="col-md-4">
              <img src="${movie.poster_path ? "https://image.tmdb.org/t/p/original/" + movie.poster_path : "assets/mi.png"}" class="slikica">
            </div> 
            <div class="col-md-8">
             <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <h6 class="card-text">${movie.release_date}</h6>
              <p class="card-text">${limitString(movie.overview, 20)}</p>
            </div>    
            </div>
        </div>
       </div>`;
      moviesFound.insertAdjacentHTML("beforeend", templ);
    })
  }).catch(err => {
    const toastLiveExample = document.getElementById("liveToast");
    document.getElementById("error-message").innerHTML = err.message;
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  });

  resultDiv.appendChild(moviesFound);
}

function limitString(text, limit) {
  const words = text.split(' ');
  if (words.length > limit) {
    const krace = words.slice(0, limit).join(' ') + '...';
    return krace;
  }
  return text;
}