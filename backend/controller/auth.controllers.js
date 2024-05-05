import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookies from "../utils/generateToken.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "password and confirm password did not match" });
    }
    const isExist = await User.findOne({ userName: userName });
    if (isExist) {
      return res.status(400).json({ error: "user alresdy exist!!" });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const profilePic = gender == "male" ? boyProfilePic : girlProfilePic;

    //for hashed password:
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      userName,
      password,
      password: hashedPassword,
      gender,
      profilePic,
    });

    if (newUser) {
      await generateTokenAndSetCookies(newUser._id.toString(), res);

      return res
        .status(201)
        .json({ message: "successfully created user!", user: newUser });
    }
  } catch (err) {
    res.status(500).json({ message: "error creating user", err: err });
  }
};

export const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isCorrectPawwword = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isCorrectPawwword) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    await generateTokenAndSetCookies(user._id.toString(), res);

    res.status(200).json({ message: "login successful", user: user });
  } catch (err) {
    res.status(500).json({ message: "error logging in", err: err });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    res.status(500).json({ message: "error in logging out" });
  }
};
