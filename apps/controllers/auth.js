const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const savedUser = await user.save();

    res.status(200).json({
      message: "User Registered successfully",
      user: {
        id: savedUser._id,
        email: savedUser.email,
        fullName: savedUser.fullName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res.status(404).json({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.API_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({
      message: "Login successful",
      data: {
        accessToken: token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
