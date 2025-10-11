import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

const handleRefreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "No refresh token provided. Please log in again to continue."
        });
    }

    try {
        const decoded = jwt.verify(refreshToken, jwtSecret);
        
        const user = {
            userId: decoded.userId,
            username: decoded.username
        }

        const newToken = jwt.sign(user, jwtSecret, {expiresIn: "15m"});
        
        res.cookie("accessToken", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none", //lax for dev
            maxAge: 1000 * 60 * 15,
        });

        return res.status(200).json({
            success: true,
            message: "Session refreshed successfully",
            user
        });
    } catch (err){
        console.error(err);
        return res.status(403).json({ 
            success: false,
            message: "Your session has expired. Please log in again to continue." 
        });
    }
}

export {handleRefreshToken};