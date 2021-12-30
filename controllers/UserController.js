let User = require('../models/User')
let PasswordToken = require('../models/PasswordToken')
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
const SECRET = 'eiofnoabnofnanfo';

class UserController {
    async index(req, res) {
        let users = await User.findAll();
        res.json(users)
    }

    async findUser(req, res) {
        let id = req.params.id;
        let user = await User.findById(id);
        if (user === undefined) {
            res.status(404);
            res.json({});
        } else {
            res.json(user)
        }
    }

    async edit(req, res) {
        let {id, name, role, email} = req.body;
        let result = await User.update(id, email, name, role);
        if (result !== undefined) {
            if (result.status) {
                res.send('Usuario atualizado com sucesso')
            } else {
                res.status(406);
                res.json(result);
            }
        } else {
            res.status(406);
            res.json({err: 'Ocorreu um erro no servidor'});
        }
    }

    async delete(req, res) {
        let id = req.params.id;
        let result = await User.delete(id);
        if (result.status) {
            res.send("Deletado com sucesso")

        } else {
            res.status(406);
            res.json(result);
        }
    }

    async create(req, res) {
        let {email, name, password} = req.body;
        if (email === undefined || email.trim() === '') {
            res.status(400);
            res.json({err: "O e-mail é inválido"})
            return;
        }
        let emailExists = await User.findEmail(email);
        if (emailExists) {
            res.status(406)
            res.json({err: 'O e-mail já está cadastrado'})
            return;
        }
        await User.create(email, password, name)

        res.status(201);
        res.json({success: 'Usuario criado com sucesso'})
        return;
    }

    async recoverPassword(req, res) {
        let email = req.body.email;
        let result = await PasswordToken.create(email);
        if (result.status) {
            res.json(result)
        } else {
            res.status(406);
            res.json(result);
        }
    }

    async changePassword(req, res) {
        let {token, password} = req.body;

        let isTokenValid = await PasswordToken.validate(token);
        if (isTokenValid.status) {

            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);
            res.json({success: "Senha alterada"})
        } else {
            res.status(406);
            res.json({err: "Token inválido!"})
        }
    }

    async login(req, res) {
        let {email, password} = req.body;
        let user = await User.findByEmail(email);
        if (user !== undefined) {
            let result = await bcrypt.compare(password, user.password)
            if (result) {
                let token = jwt.sign({email: user.email, role: user.role}, SECRET);
                res.json({token})
            } else {
                res.status(401);
                res.json({err: 'Senha incorreta'})
            }
        } else {
            res.status(401);
            res.json({status: false, err: 'Usuário não existe'})
        }
    }

    async validate(req,res) {
        res.send("Ok")
    }
}

module.exports = new UserController();
