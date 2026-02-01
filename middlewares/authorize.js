const authorize = (roles) => (req, res, next) => {
  const userRole = req.user.role;
  if (roles.includes(userRole)) {
    next();
  } else {
    res
      .status(403)
      .send({ error: "You are not allowed to perform this operation" });
  }
};

export default authorize;
