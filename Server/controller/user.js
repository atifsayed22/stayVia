const User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const cookieOption = require("../utils/cookieOption"); ; 

// ===============================
// Register User
// ===============================
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      passwordHash,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, cookieOption);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ===============================
// Login User
// ===============================
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    console.log("User found:", user);
    console.log("Password provided:", password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    console.log("Password valid:", isValid);
    
    if (!isValid) {
      console.log("Invalid password");
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, cookieOption);

    

   return  res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ===============================
// Logout User
// ===============================
module.exports.logout = (req, res) => {
 res.clearCookie("token");

    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
};


module.exports.getCurrentUser = (req, res) => {
    res.status(200).json({
        success: true,
        user: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
        },
    });
};
