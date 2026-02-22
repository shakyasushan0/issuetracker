import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken)
    return res.status(401).send({ error: "You are not authorized!" });
  const token = bearerToken.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, "myjwtsecretkey");
    const user = await User.findById(_id);
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (err) {
    res.status(400).send({ error: "Invalid Token" });
  }
};

export default auth;
