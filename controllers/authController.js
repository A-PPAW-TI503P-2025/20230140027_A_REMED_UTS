const User = require('../models/User');

// LOGIN (Admin & User)
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username, password } });

        if (!user) return res.status(401).json({ message: "Username atau Password salah!" });

        res.json({
            message: "Login berhasil",
            data: { id: user.id, username: user.username, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// REGISTER (Hanya User)
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Cek username kembar
        const exist = await User.findOne({ where: { username } });
        if (exist) return res.status(400).json({ message: "Username sudah dipakai!" });

        const newUser = await User.create({ username, password, role: 'user' });
        res.status(201).json({ message: "Registrasi berhasil, silakan login", data: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};