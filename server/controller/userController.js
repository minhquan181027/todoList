import User from "../model/userModel.js"

export const create = async (req, res) => {
    try {

        const newUser = new User(req.body);
        const { email } = newUser;
        const userExit = await User.findOne({ email });
        if (userExit) {
            return res.status(400).json({ message: "User already exists." });

        }
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        if (!user || user.length === 0) {
            return res.status(400).json({ message: "User data not found!" });
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}
export const getUser = async (req, res) => {
    try {


        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "User  not found!" });
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}
export const getUpdate = async (req, res) => {
    try {

        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "User  not found!" });
        }
        const updateData = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updateData);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}
export const getDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const user = User.findById(id);
        if (!user) res.status(400).json({ message: "User not found" });
        await User.findByIdAndDelete(id);

        res.status(200).json("User deleted sucessfully!");


    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}
