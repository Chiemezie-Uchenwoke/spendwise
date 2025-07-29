const registerUser = (req, res) => {
    const {username} = req.body;
    
    return res.status(200).json({user: `Welcome to spendwise app ${username}`});
};

export {registerUser};