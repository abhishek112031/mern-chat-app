import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "unothorized,no token provided!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ error: "unothorized,invalid token provided!" });
    }

    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({ error: "user not found!" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};
export default protectRoutes
