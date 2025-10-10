import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();
const jwtSecret = process.env.JWT_SECRET;

const logInUser = async (req, res, next) => {
    const {email, password} = req.body;

    try {

        const userEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({email: userEmail});

        if (!existingUser) {
            return res.status(401).json({
                success: false, 
                message: "Please register before login!"
            });
        } 

        if (existingUser) {
            const match = await bcrypt.compare(password, existingUser.password);

            if (match) {

                const user = {
                    userId: existingUser._id,
                    username: existingUser.username
                }

                const token = jwt.sign(user, jwtSecret, {expiresIn: "15m"});
                const refreshToken = jwt.sign(user, jwtSecret, { expiresIn: "7d" });
                
                res.cookie("accessToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "none",  //none for production
                    maxAge: 1000 * 60 * 15, // 15 mins
                });

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "none",
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                });

                return res.status(200).json({
                    success: true,
                    message: "Login Successful!",
                    user
                });

            } else {
                return res.status(403).json({
                    success: false, 
                    message: "Wrong password!"
                });
            }

        }

    } catch (err) {
        console.log(err);
        next(err);
    }
}

export {logInUser};