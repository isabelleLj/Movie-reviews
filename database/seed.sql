-- Fyller databasen med exempeldata för filmer och recensioner.
-- Recensionerna förutsätter att två testanvändare redan har registrerats.
USE filmrecension;

-- Seed data: Movies
INSERT INTO
    movies (title, genre, release_year)
VALUES ('The Matrix', 'Sci-Fi', 1999),
    (
        'Interstellar',
        'Sci-Fi',
        2014
    ),
    (
        'The Green Mile',
        'Drama',
        1999
    );

-- Seed data: Reviews
-- Förutsätter att två testanvändare redan har registrerats
INSERT INTO
    reviews (
        user_id,
        movie_id,
        rating,
        comment
    )
VALUES (
        1,
        1,
        5,
        'A fantastic science fiction movie!'
    ),
    (
        1,
        2,
        5,
        'An amazing movie with incredible storytelling.'
    ),
    (
        2,
        3,
        4,
        'A touching and memorable movie.'
    );