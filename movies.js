'use strict';
let page = 1;


function loadMore() {
  const topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}&api_key=${apiKey}`;
  fetch(topRatedURL, options).then((response) => response.json()).then((data) => {
    let movies = data.results;
    page++;
    movies.forEach(movie => {
      const templ = `
          <img onclick="openDetails(${movie.id})" class="movie-cover pb-1" src="https://image.tmdb.org/t/p/original/${movie.poster_path}" height="360px" width="235px" class="p-1"/>
          `;

      document.getElementById("all-movies").insertAdjacentHTML('beforeend', templ);
    })
  }).catch(err => {
    const toastLiveExample = document.getElementById("liveToast");
    document.getElementById("error-message").innerHTML = err.message;
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  });
}


window.onload = function() {
  loadMore();
};

function handleScroll() {
  const endPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (endPage) {
    loadMore();
  }
}

window.addEventListener('scroll', handleScroll);