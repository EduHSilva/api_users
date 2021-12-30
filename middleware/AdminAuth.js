let jwt = require('jsonwebtoken')
const SECRET = 'eiofnoabnofnanfo';
module.exports = function (req, res, next) {
    const authToken = req.headers['authorization']
    if (authToken !== undefined) {
        const bearer = authToken.split(' ');
        let token = bearer[1]
        try {
            let r = jwt.verify(token, SECRET);
            if(r.role === 1){
                next();
            } else {
                res.status(401);
                res.send();
                return;
            }
        } catch (err) {
            res.status(401);
            res.send();
            return;
        }
    } else {
        res.status(401);
        res.send();
        return;
    }
}
