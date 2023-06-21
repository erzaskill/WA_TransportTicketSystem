const {database} = require("../database/database");

class TicketService {

    async getAll() {
        return await database().all(
            "SELECT * FROM tickets"
        );
    }

    async getMyTicket(id) {
        return await database().all(
            "SELECT * FROM tickets WHERE user_id = ?",
            id
        );
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM tickets WHERE id = ?",
            id
        );
    }
    async deleteTicket(id) {
        await database().run(
            "DELETE FROM tickets WHERE id = ?",
            id
        );
    }

    async createTicket(st_where, st_from, user_id, price, time) {
        const result = await database().run(
            "INSERT INTO tickets (st_where, st_from, user_id, price, time) VALUES (?, ?, ?, ?, ?)",
            st_where, st_from, user_id, price, time
        );
        return await this.getById(result.id);
    }

}

module.exports = new TicketService();