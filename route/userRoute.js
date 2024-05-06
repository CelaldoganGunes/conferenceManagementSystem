const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

// Kullanıcı oluşturma
router.post('/create', UserController.createUser);

// Tüm kullanıcıları getirme
router.get('/', UserController.getUsers);

// ID'ye göre kullanıcıyı getirme
router.get('/:userId', UserController.getUserById);

// E-posta ile kullanıcıyı getirme
router.get('/email/:email', UserController.getUserByEmail);

// Kullanıcıyı güncelleme
router.patch('/:userId', UserController.updateUser);

// Kullanıcıyı silme
router.delete('/:userId', UserController.deleteUser);

module.exports = router;