'use strict';

const apiKey = "6b9affb57db86b0e00865e160033a52c";
const baseURL = "https://api.themoviedb.org/3"

const options = {
  method: 'GET',
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhZmZiNTdkYjg2YjBlMDA4NjVlMTYwMDMzYTUyYyIsInN1YiI6IjY1YmZkYzhmYjMzOTAzMDE4Nzk3ZGJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6uOUedaF_5VhT1MZdat-nQejqGaaTTTugjWZL0rZXSk",
  },
}

function openDetails(id) {
  localStorage.setItem('movieId', id)
  window.open("movieDetails.html", "_self");
}