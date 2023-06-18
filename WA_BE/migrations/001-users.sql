CREATE TABLE IF NOT EXISTS users (
                                     id  INTEGER PRIMARY KEY AUTOINCREMENT,
                                     username TEXT NOT NULL,
                                     password TEXT NOT NULL,
                                     email    TEXT NOT NULL,
                                     name     TEXT NOT NULL,
                                     surname  TEXT NOT NULL,
                                     role     TEXT NOT NULL
);