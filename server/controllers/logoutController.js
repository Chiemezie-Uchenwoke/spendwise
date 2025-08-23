const logOutUser = (req, res) => {
  try {
    // Clear JWT cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ success: false, message: "Could not log out. Please try again." });
  }
};

export { logOutUser };
