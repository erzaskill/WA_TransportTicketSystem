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

    async createTicket(ticket) {
        const result = await database().run(
            "INSERT INTO tickets (st_where, st_from, user_id, price, time) VALUES (?, ?, ?, ?, ?)",
            ticket.st_where, ticket.st_from, ticket.user_id, ticket.price, ticket.time
        );
        return await this.getById(result.id);
    }

}

module.exports = new TicketService();