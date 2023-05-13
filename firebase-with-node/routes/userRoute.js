const express = require('express');
const upload = require('../imageUpload');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/addUser', upload.single('profile'), userController.addUser);
router.get('/getAllUser', userController.getAllUser);
router.get('/findById/:id', userController.findById);
router.post('/updateUser', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);


module.exports = router;