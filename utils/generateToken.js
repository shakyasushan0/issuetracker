import jwt from "jsonwebtoken";

export default function generateToken(_id) {
  const token = jwt.sign({ _id }, "myjwtsecretkey", {
    expiresIn: "3d",
  });
  return token;
}
