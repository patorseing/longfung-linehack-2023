import * as Joi from "joi";

export const getBandSchema = Joi.object({
  userId: Joi.string().required(),
});

export const socialMediaSchema = Joi.object({
  facebook: Joi.string().allow(null, undefined, ''),
  instagram: Joi.string().allow(null, undefined, ''),
  tiktok: Joi.string().allow(null, undefined, ''),
  website: Joi.string().allow(null, undefined, ''),
});

export const streamingPlatformSchema = Joi.object({
  spotify: Joi.string().allow(null, undefined, ''),
  youtube: Joi.string().allow(null, undefined, ''),
  appleMusic: Joi.string().allow(null, undefined, ''),
});

export const lineBeaconSchema = Joi.object({
  hardwareId: Joi.string().required(),
  passcode: Joi.string().required(),
});

export const createBandSchema = Joi.object({
  bandName: Joi.string().required(),
  firstPromotedSong: Joi.string().allow(null, undefined, ''),
  secondPromotedSong: Joi.string().allow(null, undefined, ''),
  userId: Joi.string().required(),

  socialMedia: socialMediaSchema,
  streamingPlatform: streamingPlatformSchema,

  lineMelody: Joi.string().allow(null, undefined, ''),
  songRequest: Joi.boolean().allow(null, undefined, '').default(false),
  description: Joi.string().allow(null, undefined, ''),

  lineBeacon: Joi.array().items(lineBeaconSchema),
  bandImage: Joi.string().allow(null, undefined, ''),
  qrImage: Joi.string().allow(null, undefined, ''),
});

export const updateBandSchema = Joi.object({
  bandName: Joi.string().required(),
  firePromotedSong: Joi.string().allow(null, undefined, ''),
  secondPromotedSong: Joi.string().allow(null, undefined, ''),

  socialMedia: socialMediaSchema,
  streamingPlatform: streamingPlatformSchema,

  lineMelody: Joi.string().allow(null, undefined, ''),
  songRequest: Joi.boolean().allow(null, undefined, ''),
  description: Joi.string().allow(null, undefined, ''),

  lineBeacon: Joi.array().items(lineBeaconSchema),
  bandImage: Joi.string().allow(null, undefined, ''),
  qrImage: Joi.string().allow(null, undefined, ''),
});
