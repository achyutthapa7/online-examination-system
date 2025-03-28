const jwt = require("jsonwebtoken");
const adminMiddleware = async (req, res, next) => {
  const token = req.cookies?.admin_token;
  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
module.exports = adminMiddleware;
