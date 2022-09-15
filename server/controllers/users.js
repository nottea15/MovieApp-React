import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).sort(
      "-createdAt"
    );

    res.json({ users });
  } catch (error) {
    res.json({ message: { type: "error", message: "Get Users Error" } });
  }
};
