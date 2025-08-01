import bcrypt from "bcrypt";
import User from "../models/usermodel.js";

const saltRounds = 10;

const registerUser = async (req, res, next) => {
    const {username, email, password} = req.body;
    
    
    try {
        const userEmail = email.toLowerCase();
        const user = await User.findOne({email: userEmail});

        if (user) {
            return res.status(400).json({message: "User already exists"});
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err){
                    console.log("Error hashing password: ", err);
                    return next(err);
                }

                const newUser = await User.create({
                    username,
                    email: userEmail,
                    password: hash
                });
                
                console.log(newUser);

                return res.status(201).json({
                    success: true,
                    message: "Account created successfully! Please log in"
                });
            });
        }

    } catch (err){
        console.log(err);
        next(err);
    }
    
};

export {registerUser};