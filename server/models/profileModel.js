import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    profileImage: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;