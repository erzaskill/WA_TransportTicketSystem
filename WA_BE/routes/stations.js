const express = require("express");
const router = express.Router();
const StationService = require('../services/station-service')

router.get('/', async (req, res) => {
    const stations = await StationService.getAll();
    res.json(stations);
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const station = await StationService.getById(id);

    if (station) {
        res.json(station);
    } else {
        res.status(404).send("Not found");
    }
})

router.post('/', async (req, res) => {
    const data = req.body;
    console.log(req.user);

    if (
        data.name === undefined || data.name.trim() === "" ||
        data.text === undefined || data.text.trim() === ""
    ) {
        res.status(400).send("Wrong input");
        return;
    }

    const station = await StationService.createStation(data);

    res.status(201).json(station);
})

router.put('/:id', async (req, res) => {
    const data = req.body;
    const id = parseInt(req.params.id);
    console.log("Station ID: ", id) //debug
    console.log("Station data: ", data) //debugging

    const station = await StationService.update(id, data);

    if (!station) {
        res.status(404).send("Not found")
        return;
    }

    res.status(202).json(station);
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await StationService.delete(id);
    res.status(204).send("No Content");
})

module.exports = router;