import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const foundUser = await User.findOne({ email });
  if (foundUser)
    return res.status(400).send({ error: "User already registered!" });

  const user = await User.create({ name, email, password, role });
  res.status(201).send({
    message: "User registered",
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ error: "User not found!" });
  }

  const isMatch = await user.comparePassword(password);
  if (isMatch) {
    const token = generateToken(user._id);
    res.send({
      message: "Login Success",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    res.status(400).send({ error: "Invalid Password" });
  }
};
