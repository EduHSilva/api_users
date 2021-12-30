let express = require("express")
let app = express();
let router = express.Router();
let UserController = require("../controllers/UserController");
let AdminAuth = require("../middleware/AdminAuth")

router.post('/user', UserController.create);
router.get('/user', AdminAuth, UserController.index);
router.get('/user/:id', AdminAuth, UserController.findUser);
router.put('/user', AdminAuth, UserController.edit);
router.delete('/user/:id', AdminAuth, UserController.delete);
router.post('/recoverpassword', UserController.recoverPassword);
router.post('/changepassword', UserController.changePassword);
router.post('/login', UserController.login);
router.post('/validate', AdminAuth, UserController.validate);

module.exports = router;
