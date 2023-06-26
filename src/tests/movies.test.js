const supertest = require('supertest')
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')

const BASE_URL = '/api/v1/movies';
let movieId;

test("POST -> 'BASE_URL', should return status code 201 and res.body.name === movie.name", async () => {
    const movie = {
        name: "John Wick 4",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4ykN8FJvoxbbMCOX30QWyINsykm29ZGQ7mbFGuFDk5NeEqbqL",
        synopsis: "El marqués Vincent de Gramont pretende matar a John Wick para afianzar su poder en la Orden Suprema. Sin embargo, John tratará de adelantarse a cada uno de sus movimientos hasta lograr enfrentarse cara a cara con su peor enemigo.",
        releaseYear: 1999
    };
    const res = await supertest(app)
        .post(BASE_URL)
        .send(movie)
    movieId = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(movie.name)
});

test("GET ALL -> 'BASE_URL', should return status code 200 and res.body.length === 1", async () => {
    const res = await supertest(app)
        .get(BASE_URL)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test("GET ONE -> 'BASE_URL/:id', should return status code 200 and res.body.id === movie.id", async () => {
    const res = await supertest(app)
        .get(`${BASE_URL}/${movieId}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('John Wick 4')
});

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.name === movie.name", async () => {
    const movie = {
        name: "John Wick 4"
    };
    const res = await supertest(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movie)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movie.name)
});

test("POST -> 'BASE_URL/:id/actors', should return status code 200 and res.body === 1", async () => {
    const actorBody = {
        firstName: "Keanu",
        lastName: "Reeves",
        nationality: "Canadiense",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTkqugX0WLc78TSUXjzYAQvwT7nqU8vJknuJGldrNv0FO7kD8vl",
        birthday: "1964-09-02"
    };

    const actor = await Actor.create(actorBody)

    const res = await supertest(app)
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([actor.id])
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    await actor.destroy()
});

test("POST -> 'BASE_URL/:id/directors', should return status code 200 and res.body === 1", async() =>{
    const directorBody = {
        firstName: "Chad",
        lastName: "Stahelski",
        nationality: "Estadounidense",
        image: "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSerA6pTBnlWm0UbZKk-L0mFrQoZHFLZKeqdZC00GOyLrsFBeLgFNBpSxnAV6WLeReV",
        birthday: "1968-09-20"
    };
    const director = await Director.create(directorBody)

    const res = await supertest(app)
        .post(`${BASE_URL}/${movieId}/directors`)
        .send([director.id])
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    await director.destroy()
});

test("POST -> 'BASE_URL/:id/genres', should return status code 200 and res.body === 1", async() => {
    const genreBody = {
        name: "Action"
    }
    const genre = await Genre.create(genreBody)
    
    const res = await supertest(app)
        .post(`${BASE_URL}/${movieId}/genres`)
        .send([genre.id])
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    await genre.destroy()
})



test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await supertest(app)
        .delete(`${BASE_URL}/${movieId}`)
    expect(res.status).toBe(204)
});
