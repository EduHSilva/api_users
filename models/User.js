let knex = require('../database/connection');
let bcrypt = require('bcrypt');
let PasswordToken = require('../models/PasswordToken')

class User {

    async findAll() {
        try {
            let result = await knex.select(['id', 'email', 'role', 'name', 'created_at', 'updated_at']).table("users");
            return result;
        } catch (err) {
            throw err;
            return [];
        }
    }

    async findById(id) {
        try {
            let result = await knex.select(['id', 'email', 'role', 'name', 'created_at', 'updated_at']).table("users").where({id: id});
            if (result.length > 0) {
                return result[0]
            } else {
                return undefined;
            }
        } catch (err) {
            throw err;
            return undefined;
        }
    }

    async findByEmail(email) {
        try {
            let result = await knex.select(['id', 'email', 'role', 'name', 'password', 'created_at', 'updated_at']).table("users").where({email: email});
            if (result.length > 0) {
                return result[0]
            } else {
                return undefined;
            }
        } catch (err) {
            throw err;
            return undefined;
        }
    }




    async create(email, password, name) {
        try {
            let hash = await bcrypt.hash(password, 10);
            await knex.insert({email, password: hash, name, role: 0}).table('users');
        } catch (err) {
            throw err;
        }


    }

    async findEmail(email) {
        try {
            let result = await knex.select("*").from("users").where({email: email});
            if (result.length > 0) {
                return true;
            }
            return false;
        } catch (err) {
            throw err;
            return false;
        }
    }

    async update(id, email, name, role) {
        let user = await this.findById(id);
        if (user !== undefined) {
            let editUser = {};
            if (email !== undefined && email.trim() !== '') {
                if (email !== user.email) {
                    let result = await this.findEmail(email);
                    if (!result) {
                        editUser.email = email;
                    } else {
                        return {status: false, err: 'O e-mail já está em uso'};
                    }
                }
            }
            if (name !== undefined && name.trim() !== '') {
                editUser.name = name;
            }
            if (role !== undefined) {
                editUser.role = role;
            }
            try {
                await knex.update(editUser).where({id: id}).table("users")
                return {status: true}
            } catch (err) {
                return {status: false, err: err};
            }
        } else {
            return {status: false, err: 'O usuário não existe'};
        }
    }

    async delete(id) {
        let user = await this.findById(id);
        if (user !== undefined) {
            try {
                await knex.delete().where({id: id}).table("users");
                3
                return {status: true}
            } catch (err) {
                throw err;
                return {status: false, err: err}
            }
        } else {
            return {status: false, err: "O usuário não existe."}
        }
    }

    async changePassword(newPassword, id, token) {
        let hash = await bcrypt.hash(newPassword, 10);
        try {
            await knex.update({password: hash}).table('users').where({id: id});
            await PasswordToken.setUsed(token)
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new User();
