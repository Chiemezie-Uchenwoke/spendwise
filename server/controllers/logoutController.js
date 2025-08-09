const logOutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ message: "Could not log out. Please try again." });
        }

        // Clear cookie from browser
        res.clearCookie("connect.sid", { path: "/" });

        return res.status(200).json({ success: true, message: "Logged out successfully" });
    });
};

export { logOutUser };