import Profile from "../models/profileModel.js";

const uploadProfileImage = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        if (!req.file){
            return res.status(400).json({message: "No file uploaded"});
        }

        const filename = req.file.filename;

        // check if profile already exist
        const profile = await Profile.findOne({userId});

        if (profile){
            //update existing profile
           await Profile.updateOne({userId}, {
                profileImage: filename
            });
        } else {
            await Profile.create({userId, profileImage: filename});
        }

        return res.status(200).json({
            success: true,
            message: "Profile image uploaded successfully"
        });

    } catch(err){
        next(err);
    }
}

const getUserProfileImage = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const profile = await Profile.findOne({userId});

        if (!profile){
            return res.status(404).json({message: "Profile image not found"});
        }

        return res.status(200).json({
            success: true,
            imageUrl: `/uploads/profiles/${profile.profileImage}`
        });

    } catch(err){
        next(err);
    }
}

export {uploadProfileImage, getUserProfileImage};