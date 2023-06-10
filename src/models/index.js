const Genre = require("./Genre");
const Movie = require("./Movie");

// movie => Genre
Movie.belongsToMany(Genre, {through: 'MoviesGenres'});
Genre.belongsToMany(Movie, {through: 'MoviesGenres'});