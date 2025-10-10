import Profile from "../models/profileModel.js";
import dotenv from "dotenv";

dotenv.config();

const uploadProfileImage = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        if (!req.file){
            return res.status(400).json({success: false, message: "No file uploaded"});
        }

        //dev
        // const filename = req.file.filename; 
        const imageUrl = req.file.path;

        // check if profile already exist
        const profile = await Profile.findOne({userId});

        if (profile){
            //update existing profile
           await Profile.updateOne({userId}, {
                profileImage: imageUrl
            });
        } else {
            await Profile.create({userId, profileImage: imageUrl});
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
            return res.status(404).json({
                success: false, 
                message: "Profile image not found"
            });
        }

        return res.status(200).json({
            success: true,
            imageUrl: profile.profileImage
            // imageUrl: `${process.env.SERVER_BASE_URL}/uploads/profiles/${profile.profileImage}`
        });

    } catch(err){
        next(err);
    }
}

export {uploadProfileImage, getUserProfileImage};
