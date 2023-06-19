const express = require("express");
const router = express.Router();
const LinkService = require('../services/link-service');
router.get('/', async (req, res) => {
    const link = await LinkService.getAll();
    res.json(link);
})
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const link = await LinkService.getById(id);

    if (link) {
        res.json(link);
    } else {
        res.status(404).send("Not found");
    }
})
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await LinkService.deleteLink(id);
    res.status(204).send("No Content");
})
router.post('/', async (req, res) => {
    const data = req.body;
    console.log(req.user);

    const link = await LinkService.createLink(data);

    res.status(201).json(link);
})

module.exports = router;