CREATE TABLE IF NOT EXISTS links
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    st_where INTEGER NOT NULL,
    st_from INTEGER NOT NULL,
    arrival_time TEXT NOT NULL,
    departure_time TEXT NOT NULL,
    previous_station INTEGER NOT NULL,
    FOREIGN KEY (st_where) REFERENCES stations(id),
    FOREIGN KEY (st_from) REFERENCES stations(id),
    FOREIGN KEY (previous_station) REFERENCES stations(id)
);