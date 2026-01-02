import User from "../models/User.js";

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
