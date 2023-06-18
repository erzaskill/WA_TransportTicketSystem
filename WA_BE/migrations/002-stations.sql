CREATE TABLE IF NOT EXISTS stations
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    state       INTEGER NOT NULL,
    problem     TEXT,
    station_before INTEGER,
    station_after INTEGER,
    FOREIGN KEY (station_before) REFERENCES stations(id),
    FOREIGN KEY (station_after) REFERENCES stations(id)
);