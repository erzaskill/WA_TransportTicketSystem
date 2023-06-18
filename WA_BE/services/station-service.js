const {database} = require("../database/database");

class StationService {

    async getAll(order = "id") {
        return await database().all(
            "SELECT * FROM stations"
        );
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM stations WHERE id = ?",
            id
        );
    }
    async getNameById(id) {
        return await database().get(
            "SELECT name FROM stations WHERE id = ?",
            id
        );
    }

    async createStation(station) {
        const result = await database().run(
            "INSERT INTO stations (name, state, problem, station_before, station_after) VALUES (?, ?, ?, ?, ?)",
            station.name, station.state, station.problem, station.station_before, station.station_after
        );
        return await this.getById(result.lastID);
    }
    async updateStation(id, data) {
        await database().run(
            "UPDATE stations SET name = ?, state = ?, problem = ?, station_before = ?, station_after = ?  WHERE id = ?",
            data.name, data.state, data.problem, data.station_before, data.station_after, id
        );
        return await this.getById(id)
    }

    async deleteStation(id) {
        await database().run(
            "DELETE FROM stations WHERE id = ?",
            id
        );
    }
}

module.exports = new StationService();