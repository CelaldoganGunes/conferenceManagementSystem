const userService = require('../service/userService');

const userController = {
    // Kullanıcı oluşturma
    async createUser(req, res, next) {
        const { name, email, password, isSystemAdmin } = req.body;
        try {
            const newUser = await userService.createUser(name, email, password, isSystemAdmin);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    },

    // Tüm kullanıcıları getirme
    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    // ID'ye göre kullanıcıyı getirme
    async getUserById(req, res, next) {
        const userId = req.params.userId;
        try {
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    // E-posta ile kullanıcıyı getirme
    async getUserByEmail(req, res, next) {
        const email = req.params.email;
        try {
            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    // Kullanıcıyı güncelleme
    async updateUser(req, res, next) {
        const userId = req.params.userId;
        const newData = req.body;
        try {
            const updatedUser = await userService.updateUser(userId, newData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    },

    // Kullanıcıyı silme
    async deleteUser(req, res, next) {
        const userId = req.params.userId;
        try {
            await userService.deleteUser(userId);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = userController;