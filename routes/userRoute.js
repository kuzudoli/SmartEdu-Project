const express = require("express")
const authController = require ("../controllers/authController")
const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")
const router = express.Router();

router.route('/signup').post(authController.createUser)
router.route('/signin').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
router.route('/dashboard').get(authMiddleware, authController.getDashboard)
router.route('/:id').delete(authController.deleteUser)

module.exports = router;