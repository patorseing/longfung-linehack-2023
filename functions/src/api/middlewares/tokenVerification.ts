import {NextFunction, Request, Response} from "express";
import { appCheck } from "../../firebase";

const tokenVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const token = req.header("X-Firebase-AppCheck");

  if (!token) {
    return res.status(401).json({error: "authorized"});
  }

  try {
    await appCheck.verifyToken(token);

    return next();
  } catch (err) {
    return res.status(401).json({error: "authorized"});
  }
};

export default tokenVerification;
