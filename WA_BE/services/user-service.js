const {database} = require("../database/database");
const {passwordConfig, jwtConfig} = require("../config");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class UserService {

    async getAll() {
        return await database().all(
            "SELECT * FROM users"
        );
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM users WHERE id = ?",
            id
        );
    }
    async getByUsername(username) {
        return await database().get(
            "SELECT * FROM users WHERE username = ?",
            username
        );
    }

    async getPasswordByUsername(username) {
        return await database().get(
            "SELECT password FROM users WHERE username = ?",
            username
        );
    }

    async registerUser(username, password, email, name, surname, role){
        return await database().get(
            "INSERT INTO users (username, password, email, name, surname, role) VALUES (?, ?, ?, ?, ?, ?)",
            username,
            password,
            email,
            name,
            surname,
            role
        );
    }

    generateToken(user) {
        const tokenPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            surname: user.surname,
            role: user.role
        };
        return jwt.sign(
            tokenPayload,
            jwtConfig.secret,
            {
                algorithm: jwtConfig.algorithms[0]
            }
        );
    }

    hashPassword(password) {
        return crypto.pbkdf2Sync(
            password,
            passwordConfig.salt,
            passwordConfig.iterations,
            passwordConfig.keylen,
            passwordConfig.digest
        ).toString(`hex`);
    }
}

module.exports = new UserService();