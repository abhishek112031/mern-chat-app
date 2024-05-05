import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 15,
    // secure:process.env.NODE_ENV==='production',
    httpOnly: true,
    sameSite: "strict",
    secure:process.env.NODE_ENV!=='development'
  });
};

export default generateTokenAndSetCookies
