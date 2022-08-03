$(document).ready(function() {
    moviesInLibrary();
});

const URLJSON = "js/movies.json";

$.getJSON(URLJSON, function (answer, state) {
    if (state== "success") {
        let movies = answer.movies;
        for (const movie of movies) {
            $("#movie").append(
                `<div class="movie__item">
                    <div class="movie__favourite">
                        <button id="btn${movie.id}" class="movie__favourite-button">
                            <i class="movie__favourite-icon fas fa-ticket-alt"></i>
                        </button>
                    </div>
                    <div class="movie__poster">
                        <img src="${movie.poster}" alt="${movie.title} poster" class="movie__poster-image">
                    </div>
                    <div class="movie__details">
                        <h4 class="movie__details-title">${movie.title}</h4>
                        <p class="movie__details-platform">${movie.platform}</p>
                        <ul class="movie__details-list">
                            <li class="movie__details-list__item"><span class="movie__details-list__bold">Genre:</span>${movie.genre}</li>
                            <li class="movie__details-list__item"><span class="movie__details-list__bold">Duration:</span>${movie.duration}</li>
                        </ul>
                    </div>
                </div>`
            );//add director and cast with a +info
            $(`#btn${movie.id}`).on('click', function() {
                addToLibrary(movie);
            });
        };
    };
});

let library = [];

//start searchbox
let searchboxForm = document.getElementById("searchboxForm");
searchboxForm.addEventListener("submit", findMovie);
let searchboxText = document.getElementById("searchboxText");

function findMovie(ev) {
    $.getJSON(URLJSON, function (answer, state) {
        if (state == "success") {
            let movies = answer.movies;
            let movieSearched = searchboxText.value;
            const movieFound = movies.find(movie => movie.title === movieSearched);

            Swal.fire (
                movieFound.title + ' is on',
                movieFound.platform,
                "info"
            );
        };
    });
    ev.preventDefault();
};

//end searchbox

//start library
function addToLibrary(newLibraryMovie) {
    library.push(newLibraryMovie);
    console.log(library);
    Swal.fire (
        newLibraryMovie.title,
        'Has been added to your library',
        'success'
    );
    localStorage.setItem("myLibrary", JSON.stringify(library));
};

const newLibrary = JSON.parse(localStorage.getItem("myLibrary"));

function moviesInLibrary() {
    for (const addMovie of newLibrary) {
        $("#saved").append(
            `<div class="movie__item">
                <div class="movie__favourite">
                    <button class="movie__favourite-button" onclick="addToLibrary(${addMovie});">
                        <i class="movie__favourite-icon fas fa-ticket-alt"></i>
                    </button>
                </div>
                <div class="movie__poster">
                </div>
                <div class="movie__details">
                    <h4 class="movie__details-title">${addMovie.title}</h4>
                    <p class="movie__details-plataform">${addMovie.platform}</p>
                    <ul class="movie__details-list">
                        <li class="movie__details-list__item"><span class="movie__details-list__bold">Genero:</span>${addMovie.genre}</li>
                        <li class="movie__details-list__item"><span class="movie__details-list__bold">Duracion:</span>${addMovie.duration}</li>
                        <li class="movie__details-list__item"><span class="movie__details-list__bold">Director:</span>${addMovie.director}</li>
                        <li class="movie__details-list__item"><span class="movie__details-list__bold">Elenco:</span>${addMovie.cast}</li>
                    </ul>
                </div>
            </div>`
        );
    };
};

//end library