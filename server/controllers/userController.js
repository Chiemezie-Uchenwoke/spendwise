const getUser = (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Not Authenticated!"
        });
    }

    return res.status(200).json({
        success: true,
        user: req.user
    });
}

export default getUser;