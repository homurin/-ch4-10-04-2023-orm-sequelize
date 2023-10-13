const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auth, User } = require("../models");
const ApiError = require("../utils/apiError");
const dotenv = require("dotenv").config();

const register = async (req, res, next) => {
  const { name, email, password, confirmPassword, age, address } = req.body;
  try {
    // validation check email
    const query = {
      where: {
        email,
      },
    };
    const user = await Auth.findOne(query);

    if (user) {
      next(new ApiError("User email alredy taken", 400));
    }

    // minium password length

    if (password.length < 8) {
      next(new ApiError("Minimum password must be 8 character or more"));
    }
    // confirm password
    if (password !== confirmPassword) {
      next(new ApiError("Password does not match"));
    }

    const saltRound = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRound);
    const confirmHashedPassword = bcrypt.hashSync(confirmPassword, saltRound);
    const newUser = await User.create({
      name,
      age,
      address,
    });
    await Auth.create({
      email,
      password: hashedPassword,
      confirmPassword: confirmHashedPassword,
      userId: newUser.id,
    });
    res.status(201).json({
      status: "created",
      data: {
        ...newUser,
        email,
        hashedPassword,
        confirmHashedPassword,
      },
    });
  } catch (err) {
    console.log(err);
    next(new ApiError(err.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({
      where: { email },
      include: ["User"],
    });
    console.log("Data user:", user);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.name,
          role: user.role,
          email: user.email,
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({
        message: "success",
        token,
      });
      return;
    }
    next(new ApiError("Wrong email or password", 500));
  } catch (err) {
    console.log(err);
    next(new ApiError(err.message, 500));
  }
};

const checkToken = (req, res, next) => {
  const data = req.user;
  try {
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(new ApiError("Internal serve error", 500));
  }
};

module.exports = {
  register,
  login,
  checkToken,
};
