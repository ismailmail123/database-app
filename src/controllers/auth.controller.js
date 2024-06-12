const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { user: UserModel } = require("../models")

const login = async(req, res, next) => {

    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } })
    if (!user) {
        return res.status(401).json({ message: "Invalid email/password" })
    }

    const isValid = await bcrypt.compare(password, user.password); //(password yang dikirim, password dari database)
    if (!isValid) {
        return res.status(401).json({ message: "Invalid email/password" })
    }

    const data = {
        id: user.id,
        email: user.email
    }
    const token = jwt.sign(data, process.env.JWT_SECRET); //(data yg dikirim, data dari jwt secret)

    return res.send({
        message: "Login success fully",
        data: {
            token: token, //bisa dengan token saja
        }
    })

}

module.exports = {
    login
}