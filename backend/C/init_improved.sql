CREATE DATABASE backend_c_improved;
\c backend_c_improved

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

CREATE INDEX items_genre_id_idx ON items (genre_id);
