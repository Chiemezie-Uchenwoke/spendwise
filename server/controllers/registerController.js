import bcrypt from "bcrypt";
import User from "../models/usermodel.js";

const saltRounds = 10;

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const trimUsername = username.trim();
    const userEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: userEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({
      username: trimUsername,
      email: userEmail,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully! Please log in"
    });

  } catch (err) {
    console.error("Registration error:", err);
    return next(err);
  }
};

export { registerUser };
