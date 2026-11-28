<!-- Beskriver databasens entiteter och relationer i ett Mermaid ER-diagram. -->

# FilmRecension – Entity Relationship Diagram

```mermaid
ER-DIAGRAM-CODE-HERE

erDiagram
    USERS ||--o{ REVIEWS : writes
    MOVIES ||--o{ REVIEWS : receives
    USERS ||--o{ WATCHLIST : has
    MOVIES ||--o{ WATCHLIST : appears_in

    USERS {
        INT id PK
        VARCHAR email UK
        VARCHAR password_hash
    }

    MOVIES {
        INT id PK
        VARCHAR title
        VARCHAR genre
        SMALLINT release_year
    }

    REVIEWS {
        INT id PK
        INT user_id FK
        INT movie_id FK
        TINYINT rating
        TEXT comment
    }

    WATCHLIST {
        INT user_id PK, FK
        INT movie_id PK, FK
    }
```
