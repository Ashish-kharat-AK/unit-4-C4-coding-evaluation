const User = require("../models/user.model");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY)
}

//creating the register system
const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        //we need to check the email whether it is already present or not
        if (user) {
            return res.status(400).send({ message: "Email already Exists" });
        }
        //if the user is new lert them to creatye the new id;
        user = await User.create(req.body);

        const token = generateToken(user);
        return res.status(200).send({ user, token });

    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

///creating the login system;

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        //checking if emaiul exist or not 
        if (!user) {
            return res.status(400).send("Wrong email or Password");
        }
        //if email exists then we need to check the passwoerd;
        const match = user.checkPassword(req.body.password);

        //if the password doesnt match 
        if (!match) {
            return res.status(400).send({ message: "Wrong email or Password" });
        }
        //if it matches
        const token = generateToken(user);
        return res.status(200).send({ user, token });
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}
module.exports = { register, login };