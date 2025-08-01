import bcrypt from "bcrypt";
import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();
const jwtSecret = process.env.JWT_SECRET;

const logInUser = async (req, res, next) => {
    const {email, password} = req.body;

    try {

        const existingUser = await User.findOne({email});

        if (!existingUser) {
            return res.status(401).json({message: "Please register before login!"});
        } 

        if (existingUser) {
            const match = await bcrypt.compare(password, existingUser.password);

            if (match) {

                const user = {
                    userId: existingUser._id,
                    username: existingUser.username
                }

                const token = jwt.sign(user, jwtSecret, {expiresIn: "15m"});
                req.session.accessToken = token;

                return res.status(200).json({
                    success: true,
                    message: "Login Successful!",
                    user
                })
            } else {
                return res.status(403).json({message: "Wrong password!"});
            }

        }

    } catch (err) {
        console.log(err);
        next(err);
    }
}

export {logInUser};