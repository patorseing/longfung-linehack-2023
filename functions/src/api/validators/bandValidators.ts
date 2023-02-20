import * as Joi from "joi";

export const getBandSchema = Joi.object({
  userId: Joi.string().required(),
});

export const socialMediaSchema = Joi.object({
  facebook: Joi.string().allow(null, ""),
  instagram: Joi.string().allow(null, ""),
  tiktok: Joi.string().allow(null, ""),
  website: Joi.string().allow(null, ""),
});

export const streamingPlatformSchema = Joi.object({
  spotify: Joi.string().allow(null, ""),
  youtube: Joi.string().allow(null, ""),
  appleMusic: Joi.string().allow(null, ""),
});

export const lineBeaconSchema = Joi.object({
  hardwareId: Joi.string().required(),
  passcode: Joi.string().required(),
});

export const createBandSchema = Joi.object({
  bandName: Joi.string().required(),
  firstPromotedSong: Joi.string().allow(null, ""),
  secondPromotedSong: Joi.string().allow(null, ""),
  userId: Joi.string().required(),

  socialMedia: socialMediaSchema,
  streamingPlatform: streamingPlatformSchema,

  lineMelody: Joi.string().allow(null, ""),
  songRequest: Joi.boolean().allow(null, "").default(false),
  description: Joi.string().allow(null, ""),

  lineBeacon: Joi.array().items(lineBeaconSchema),
  bandImage: Joi.string().allow(null, ""),
  qrImage: Joi.string().allow(null, ""),
});

export const updateBandSchema = Joi.object({
  bandName: Joi.string().required(),
  firePromotedSong: Joi.string().allow(null, ""),
  secondPromotedSong: Joi.string().allow(null, ""),

  socialMedia: socialMediaSchema,
  streamingPlatform: streamingPlatformSchema,

  lineMelody: Joi.string().allow(null, ""),
  songRequest: Joi.boolean().allow(null, ""),
  description: Joi.string().allow(null, ""),

  lineBeacon: Joi.array().items(lineBeaconSchema),
  bandImage: Joi.string().allow(null, ""),
  qrImage: Joi.string().allow(null, ""),
});
