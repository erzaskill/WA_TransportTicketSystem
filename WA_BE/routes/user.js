const express = require("express");
const router = express.Router();
const userService = require('../services/user-service')



router.post('/login', async (req, res) => {
    let userPassword = userService.hashPassword(req.body.password)
    let dbPassword = await userService.getPasswordByUsername(req.body.username)
    console.log(dbPassword)
    if(userPassword !== dbPassword.password) {
        console.log("incorrect passwords!")
    } else {
        const user = await userService.getByUsername(req.body.username);
        console.log("User info: ", user)
        const response = {
            token: userService.generateToken(user)
        };
        console.log("User succesfully logged!")

        res.status(201).json(response)
    }
})
router.post('/register', async (req, res) => {
    const hash = userService.hashPassword(req.body.password);
    console.log("Hash of the password: ", hash);

    const user = await userService.getByUsername(req.body.username);

    if(user) {
        console.log("User with this login already exists!")
    } else {
        await userService.registerUser(req.body.username, hash, req.body.email ,req.body.name, req.body.surname, req.body.role)
        console.log("User succesfully registrated!")
        const user = await userService.getByUsername(req.body.username);
        const response = {
            token: userService.generateToken(user)
        };
        res.status(201).json(response)
    }
})

router.get('/', async (req, res) => {
    const users = await userService.getAll();
    console.log(users)
    res.json(users);
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await userService.getById(id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send("Not found");
    }
})

router.post('/', async (req, res) => {
    const hash = userService.hashPassword(req.body.password);
    console.log(hash);

    res.status(201).send();
})

// GET INFO OF THE CURRENTLY LOGGED IN USER
router.get('/info', async (req, res) => {
    const tokenPayload = req.user;
    console.log("Token: " + tokenPayload);
    res.json(tokenPayload);
})

module.exports = router;