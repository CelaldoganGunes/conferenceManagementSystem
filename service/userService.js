const User = require('../model/user');

const userService = {
    // Kullanıcı oluşturma
    async createUser(name, email, password, isSystemAdmin) {
        try {
            const newUser = new User({
                name,
                email,
                password,
                isSystemAdmin
            });
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw new Error(`Kullanıcı oluşturulamadı: ${error.message}`);
        }
    },
    
    // Kullanıcıları getirme
    async getUsers() {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw new Error(`Kullanıcılar getirilemedi: ${error.message}`);
        }
    },
    
    async login(email, password) {
        try {
            const user = await User.findOne({ email: email});
            if (user && user.password == password)
            {
                return user;
            }    
            return null;                
        } catch (error) {
            throw new Error(`Kullanıcı getirilemedi: ${error.message}`);
        }
    },
    
    // Kullanıcıyı ID'ye göre getirme
    async getUserById(userId) {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            throw new Error(`Kullanıcı getirilemedi: ${error.message}`);
        }
    },

    // Kullanıcıyı e-posta ile getirme
    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            throw new Error(`Kullanıcı getirilemedi: ${error.message}`);
        }
    },

    // Kullanıcıyı güncelleme
    async updateUser(userId, newData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error(`Kullanıcı güncellenemedi: ${error.message}`);
        }
    },

    // Kullanıcıyı silme
    async deleteUser(userId) {
        try {
            await User.findByIdAndDelete(userId);
        } catch (error) {
            throw new Error(`Kullanıcı silinemedi: ${error.message}`);
        }
    },

    /////////////
    /////////////
    /////////////
    /////////////
    /////////////
    /////////////


};

module.exports = userService;
