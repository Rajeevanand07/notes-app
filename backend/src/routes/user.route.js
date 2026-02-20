const express = require('express');
const {createUser, loginUser, logoutUser, getCurrentUser} = require('../controllers/user.controller')
const userAuth = require('../middleware/auth.middleware')
const router = express.Router();

router.post('/signup', createUser)
router.post('/login', loginUser)
router.post('/logout',userAuth, logoutUser)
router.get('/currentUser', userAuth, getCurrentUser)



module.exports = router
