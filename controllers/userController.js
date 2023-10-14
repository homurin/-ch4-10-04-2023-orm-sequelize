const { User, Auth } = require("../models");
const ApiError = require("../utils/apiError");

const findAllUser = async (req, res, next) => {
  try {
    const users = await User.findAll({ include: ["Auth", "Shops"] });
    res.status(200).json({
      status: "ok",
      data: users,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};

const findOneUserById = async (req, res, next) => {
  try {
    const query = {
      where: {
        id: req.params.id,
      },
    };
    const user = await User.findOne(query, { include: ["Auth"] });
    if (user === null) {
      next(new ApiError("User not found", 404));
      return;
    }
    res.status(200).json({
      status: "ok",
      data: user,
    });
  } catch (err) {
    next(new ApiError("Internal server error", 500));
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, age, address, role } = req.body;

    if (role !== "Owner" && role !== "Staff") {
      next(new ApiError("There is only two role, Owner and Staff", 400));
      return;
    }
    const newUser = await User.create({ name, age, address, role });
    res.status(201).json({
      status: "created",
      data: newUser,
    });
  } catch (err) {
    next(new ApiError("Internal server error", 500));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, age, address, role } = req.body;
    const query = {
      where: {
        id: req.params.id,
      },
    };
    const user = await User.findOne(query);
    if (user === null) {
      next(new ApiError("User not found", 404));
      return;
    }
    if (role !== "Owner" && role !== "Staff") {
      next(new ApiError("There is only two role, Owner and Staff", 400));
      return;
    }

    const editedUser = await User.update({ name, age, address, role }, query);
    res.status(201).json({
      status: "created",
      data: editedUser,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const query = {
      where: {
        id: req.params.id,
      },
    };

    const user = await User.findOne(query);

    if (user === null) {
      next(new ApiError("User not found", 404));
      return;
    }

    const deletedUser = await User.destroy(query);

    res.status(201).json({
      status: "success",
      data: deletedUser,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};

module.exports = {
  findAllUser,
  findOneUserById,
  createUser,
  updateUser,
  deleteUser,
};
