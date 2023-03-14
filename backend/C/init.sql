CREATE DATABASE backend_c;
\c backend_c

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128)
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    price INTEGER,
    genre_id INTEGER REFERENCES genres(id)
);

