const global = {
  currentPage: window.location.pathname,
};

// Display 20 most popular movies
async function displayPopularMovies() {
  const { results: arrayResults } = await fetchAPIData("movie/popular");

  arrayResults.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    // Before adding the card to the DOM, we need to set the innerHTML of the div to the HTML string and also check if the movie has a poster image.
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
              ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">`
              : `<img src='images/no-image.jpg' class='card-img-top' alt='${movie.title}'>`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
    `;
    document.getElementById("popular-movies").appendChild(div);
  });
}

// Display 20 most popular TV shows
async function displayPopularShows() {
  // Destructing the results from the API call
  const { results } = await fetchAPIData("tv/popular");

  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    // Before adding the card to the DOM, we need to set the innerHTML of the div to the HTML string and also check if the movie has a poster image.
    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path
              ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}">`
              : `<img src='images/no-image.jpg' class='card-img-top' alt='${show.name}'>`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
    `;
    document.getElementById("popular-shows").appendChild(div);
  });
}

// fetch data from TMDb API
async function fetchAPIData(endpoint) {
  const API_KEY = "584456b0298ab7dcd1e1ad608d920e58";
  const API_URL = `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=en-US`;

  showSpinner();

  const response = await fetch(API_URL);

  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// Highlight Active Link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

// Initialize App
function init() {
  // This is for creating the routes
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
       displayPopularShows();
      break;
    case "/movie-details.html":
      console.log("movie-details");
      break;
    case "/tv-details.html":
      console.log("tv-details");
      break;
    case "/search.html":
      console.log("search");
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
