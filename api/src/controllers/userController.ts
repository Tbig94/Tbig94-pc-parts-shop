import { Request, Response } from "express";
import { User } from "./../models/user";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ where: { email: email } });
  } catch {
    throw new Error("Error! Something went wrong.");
  }
  if (!existingUser || existingUser.password != password) {
    throw new Error("Wrong details please check at once");
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    throw new Error("Error! Something went wrong.");
  }

  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    },
  });
};

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const newUser = User.build({
    email,
    password,
    role: "user",
  });

  try {
    await newUser.save();
  } catch {
    throw new Error("Error! Something went wrong.");
  }
  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    throw new Error(err.stack);
  }
  res.status(201).json({
    success: true,
    data: { userId: newUser.id, email: newUser.email, token: token },
  });
};

const testAccess = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
  });
};

const UserController = {
  login,
  signup,
  testAccess,
};

export default UserController;
