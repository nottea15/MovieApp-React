import User from "../models/User.js";
import jwt from "jsonwebtoken";
import fs from "fs-extra";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        message: {
          type: "error",
          content: "Username is already exist",
        },
      });
    }
    if (req.file == null) {
      const url = "default.png";
      const newUser = new User({
        username,
        password,
        imgUrl: url,
      });
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      await newUser.save();

      return res.json({
        newUser,
        token,
        message: {
          type: "success",
          content: "Register succesful",
        },
      });
    }

    // const newImg = fs.readFileSync(req.file.path);
    // const encImg = newImg.toString("base64");
    const newUser = new User({
      username,
      password,
      imgUrl: req.file.filename,
    });
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    await newUser.save();

    res.json({
      newUser,
      token,
      message: {
        type: "success",
        content: "Register succesful",
      },
    });
  } catch (error) {
    res.json({
      message: {
        type: "error",
        content: "register error",
      },
    });
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: {
          type: "error",
          content: "No user exist",
        },
      });
    }
    if (password !== user.password) {
      console.log(user.password);
      return res.json({
        message: {
          type: "error",
          content: "Wrong password",
        },
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.json({
      token,
      user,
      message: {
        type: "success",
        content: "You are logged in",
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: {
        type: "error",
        content: "Login error",
      },
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "No user exist",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({
      message: "No access",
    });
  }
};

export const favouriteMovie = async (req, res) => {
  try {
    const movie = req.body;

    await User.findByIdAndUpdate(req.userId, {
      $push: { favouriteMovies: movie },
    });
    const user = await User.findById(req.userId);

    res.json({
      user,
      message: { type: "success", content: "favouriteMovie created" },
    });
  } catch (error) {
    res.json({
      message: { type: "error", content: "moviemar error" },
    });
  }
};

export const removefavouriteMovie = async (req, res) => {
  try {
    await User.findOneAndUpdate(req.userId, {
      $pull: { favouriteMovies: { id: Number(req.params.id) } },
    });
    const user = await User.findById(req.userId);
    res.json({
      user,
      message: { type: "warn", content: "favouriteMovie deleted" },
    });
  } catch (error) {
    res.json({
      message: { type: "error", content: "moviemar error" },
    });
  }
};
