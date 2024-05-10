const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

// Kullanıcı oluşturma
router.post('/create', UserController.createUser);
router.post('/login',UserController.login);


// Tüm kullanıcıları getirme
router.get('/', UserController.getUsers);

router.get('/conferences',UserController.getConferencesByAttendeeId);

// E-posta ile kullanıcıyı getirme
router.get('/email/:email', UserController.getUserByEmail);

// ID'ye göre kullanıcıyı getirme
router.get('/:userId', UserController.getUserById);

// Kullanıcıyı güncelleme
router.patch('/:userId', UserController.updateUser);

// Kullanıcıyı silme
router.delete('/:userId', UserController.deleteUser);



module.exports = router;