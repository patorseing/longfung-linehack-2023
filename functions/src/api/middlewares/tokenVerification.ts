import {NextFunction, Request, Response} from "express";
import * as functions from "firebase-functions";

import {appCheck} from "../../firebase";

const tokenVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  if (functions.config().environment.mode == "dev") {
    return next();
  }

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
