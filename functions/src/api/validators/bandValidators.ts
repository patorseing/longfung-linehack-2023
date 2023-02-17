import { body } from "express-validator";

export const getBandsValidators = [body("userId").notEmpty()];

export const createBandValidators = [
  body("userId").notEmpty(),
  body("bandName").notEmpty(),
  body("firstPromotedSong").notEmpty().bail().isString(),
  body("secondPromotedSong").notEmpty().bail().isString(),
];
