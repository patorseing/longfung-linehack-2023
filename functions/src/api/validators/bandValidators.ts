import {body} from "express-validator";
import * as Joi from "joi";

export const getBandsValidators = [body("userId").notEmpty()];

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

export const createBandValidators = [
  body("bandName").notEmpty(),
  body("firstPromotedSong").optional().isString(),
  body("secondPromotedSong").optional().isString(),
  body("userId").notEmpty(),

  body("socialMedia").optional(),
  body("socialMedia.facebook").optional().isString(),
  body("socialMedia.instagram").optional().isString(),
  body("socialMedia.tiktok").optional().isString(),
  body("socialMedia.website").optional().isString(),

  body("streamingPlatform").optional(),
  body("streamingPlatform.spotify").optional().isString(),
  body("streamingPlatform.youtube").optional().isString(),
  body("streamingPlatform.appleMusic").optional().isString(),

  body("lineMelody").optional().isString(),
  body("songRequest").optional().isBoolean(),
  body("description").optional().isString(),

  body("lineBeacon").optional(),
  body("lineBeacon.*.hardwareId").isString(),
  body("lineBeacon.*.passcode").isString(),

  body("bandImage").optional().notEmpty(),
  body("qrImage").optional().notEmpty(),
];

export const updateBandValidators = [
  body("bandName").notEmpty(),
  body("firstPromotedSong").optional().isString(),
  body("secondPromotedSong").optional().isString(),

  body("socialMedia").optional(),
  body("socialMedia.facebook").optional().isString(),
  body("socialMedia.instagram").optional().isString(),
  body("socialMedia.tiktok").optional().isString(),
  body("socialMedia.website").optional().isString(),

  body("streamingPlatform").optional(),
  body("streamingPlatform.spotify").optional().isString(),
  body("streamingPlatform.youtube").optional().isString(),
  body("streamingPlatform.apple_music").optional().isString(),

  body("lineMelody").optional().isString(),
  body("songRequest").optional().isBoolean(),
  body("description").optional().isString(),

  body("lineBeacon").optional(),
  body("lineBeacon.*.hardwareId").isString(),
  body("lineBeacon.*.passcode").isString(),

  body("bandImage").optional().notEmpty(),
  body("qrImage").optional().notEmpty(),
];
