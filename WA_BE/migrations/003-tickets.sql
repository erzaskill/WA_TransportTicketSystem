CREATE TABLE IF NOT EXISTS tickets
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    st_where INTEGER NOT NULL,
    st_from INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    price REAL NOT NULL,
    time TEXT NOT NULL,
    FOREIGN KEY (st_where) REFERENCES stations(id),
    FOREIGN KEY (st_from) REFERENCES stations(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    );