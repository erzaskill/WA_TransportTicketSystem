const {database} = require("../database/database");

class LinkService {

    async getAll() {
        return await database().all(
            "SELECT * FROM links"
        );
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM links WHERE id = ?",
            id
        );
    }
    async deleteLink(id) {
        await database().run(
            "DELETE FROM links WHERE id = ?",
            id
        );
    }

    async createLink(title, st_where, st_from, arrival_time, departure_time, previous_station) {
        const result = await database().run(
            "INSERT INTO links (title, st_where, st_from, arrival_time, departure_time, previous_station) VALUES (?, ?, ?, ?, ?, ?)",
            title, st_where, st_from, arrival_time, departure_time, previous_station
        );
        return await this.getById(result.id);
    }

}

module.exports = new LinkService();