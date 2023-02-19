import {body} from "express-validator";
import * as Joi from "joi";

export const getBandsValidators = [body("userId").notEmpty()];

export const getBandSchema = Joi.object({
  userId: Joi.string().required(),
});

export const socialMediaSchema = Joi.object({
  facebook: Joi.string().optional(),
  instagram: Joi.string().optional(),
  tiktok: Joi.string().optional(),
  website: Joi.string().optional(),
});

export const streamingPlatformSchema = Joi.object({
  spotify: Joi.string().optional(),
  youtube: Joi.string().optional(),
  appleMusic: Joi.string().optional(),
});

export const lineBeaconSchema = Joi.object({
  hardwareId: Joi.string().required(),
  passcode: Joi.string().required(),
});

export const createBandSchema = Joi.object({
  bandName: Joi.string().required(),
  firePromotedSong: Joi.string().optional(),
  secondPromotedSong: Joi.string().optional(),
  userId: Joi.string().required(),

  socialMedia: socialMediaSchema,
  streamingPlatform: streamingPlatformSchema,

  lineMelody: Joi.string().optional(),
  songRequest: Joi.boolean().optional().default(false),
  description: Joi.string().optional(),

  lineBeacon: Joi.array().items(lineBeaconSchema),
  bandImage: Joi.string().optional(),
  qrImage: Joi.string().optional(),
});

export const updateBandSchema = Joi.object({
  bandName: Joi.string().required(),
  firePromotedSong: Joi.string().optional(),
  secondPromotedSong: Joi.string().optional(),

  socialMedia: socialMediaSchema,
  streamingPlatform: streamingPlatformSchema,

  lineMelody: Joi.string().optional(),
  songRequest: Joi.boolean().optional(),
  description: Joi.string().optional(),

  lineBeacon: Joi.array().items(lineBeaconSchema),
  bandImage: Joi.string().optional(),
  qrImage: Joi.string().optional(),
});
