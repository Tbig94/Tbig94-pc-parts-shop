import { Request, Response } from "express";

const roleTestUser = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    throw Error(`err...`);
  }
};

const roleTestAdmin = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    throw Error(`err...`);
  }
};

const TestController = {
  roleTestUser,
  roleTestAdmin,
};

export default TestController;
