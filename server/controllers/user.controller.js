import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import {
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
} from "../models/user.model.js";

export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

// UPDATE USER
export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can update only your account!"));
    }

    const user = await getUserByEmail(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));

    let updatedFields = {
      ...user,
      fullname: req.body.fullname || user.fullname,
      email: req.body.email || user.email,
      phone: req.body.phone || user.phone,
      profilePicture: req.body.profilePicture || user.profilePicture,
      updatedAt: new Date().toISOString(),
    };

    if (req.body.password) {
      updatedFields.password = bcryptjs.hashSync(req.body.password, 10);
    }

    await updateUserByEmail(req.params.id, updatedFields);

    const { password, ...rest } = updatedFields;
    res.status(200).json(rest);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can delete only your account!"));
    }

    await deleteUserByEmail(req.params.id);

    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// import User from "../models/user.model.js";
// import { errorHandler } from "../utils/error.js";
// import bcryptjs from "bcryptjs";

// export const test = (req, res) => {
//   res.json({
//     message: "API is working!",
//   });
// };

// // update user

// export const updateUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id) {
//     return next(errorHandler(401, "You can update only your account!"));
//   }
//   try {
//     if (req.body.password) {
//       req.body.password = bcryptjs.hashSync(req.body.password, 10);
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           fullname: req.body.fullname,
//           email: req.body.email,
//           phone: req.body.phone,
//           password: req.body.password,
//           profilePicture: req.body.profilePicture,
//         },
//       },
//       { new: true }
//     );
//     const { password, ...rest } = updatedUser._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// // delete user

// export const deleteUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id) {
//     return next(errorHandler(401, "You can delete only your account!"));
//   }
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json("User has been deleted...");
//   } catch (error) {
//     next(error);
//   }
// };
