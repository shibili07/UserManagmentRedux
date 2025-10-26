import User from "../models/User.js";

// @desc Get all users (Admin)
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// @desc Create new user (Admin)
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  res.status(201).json(user);
};

// @desc Update user (Admin)
export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;
  if (req.body.password) user.password = req.body.password;

  const updatedUser = await user.save();
  res.json(updatedUser);
};

// @desc Delete user (Admin)
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.deleteOne();
  res.json({ message: "User deleted" });
};

