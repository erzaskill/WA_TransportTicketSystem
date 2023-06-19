const express = require("express");
const router = express.Router();
const TicketService = require('../services/ticket-service');
router.get('/', async (req, res) => {
    const ticket = await TicketService.getAll();
    res.json(ticket);
})
router.get('user/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const ticket = await TicketService.getMyTicket(id);
    res.json(ticket);
})
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const ticket = await TicketService.getById(id);

    if (ticket) {
        res.json(ticket);
    } else {
        res.status(404).send("Not found");
    }
})
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await TicketService.deleteTicket(id);
    res.status(204).send("No Content");
})
router.post('/', async (req, res) => {
    const data = req.body;
    console.log(req.user);

    const ticket = await TicketService.createTicket(data);

    res.status(201).json(ticket);
})

module.exports = router;