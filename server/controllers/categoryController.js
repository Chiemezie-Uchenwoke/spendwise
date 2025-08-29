import Category from "../models/categoryModel.js";

const fetchCategories = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user){
            return res.status(401).json({
                success: false,
                message: "Please sign in or register"
            });
        }

        const categories = await Category.find({});

        return res.status(200).json({
            success: true,
            categories
        });
        
    } catch (err){
        console.error(err);
        next(err);
    }
}

export default fetchCategories;