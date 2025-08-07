import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
    const token = req.session.accessToken;

    if (!token) return res.status(401).json({message: "Access denied! No access token provided."});

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;

        next();

    } catch (err) {
        console.error("Invalid token:", err);
        return res.status(403).json({ message: "Invalid or expired access token" });
    }
}

export {authenticateUser};
