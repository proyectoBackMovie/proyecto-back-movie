const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

// table pivot MoviesGenres
Movie.belongsToMany(Genre, {through: 'MoviesGenres'});
Genre.belongsToMany(Movie, {through: 'MoviesGenres'});

// table ppivot MoviesActors
Movie.belongsToMany(Actor, {through: 'MoviesActors'});
Actor.belongsToMany(Movie, {through: 'MoviesActors'});

// table ppivot MoviesDirectors
Movie.belongsToMany(Director, {through: 'MoviesDirectors'});
Director.belongsToMany(Movie, {through: 'MoviesDirectors'});

