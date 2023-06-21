const express = require("express");
const router = express.Router();
const StationService = require('../services/station-service');

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
    const station = await StationService.createStation(req.body.name, req.body.state, req.body.problem, req.body.station_before, req.body.station_after);

    res.status(201).json(station);
})

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    console.log("Station ID: ", id) //debug

    const station = await StationService.updateStation(id, req.body.name, req.body.state, req.body.problem, req.body.station_before, req.body.station_after );

    if (!station) {
        res.status(404).send("Not found")
        return;
    }

    res.status(202).json(station);
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await StationService.deleteStation(id);
    res.status(204).send("No Content");
})

module.exports = router;