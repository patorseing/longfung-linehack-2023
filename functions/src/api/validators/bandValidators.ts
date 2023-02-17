import {body} from "express-validator";

export const getBandsValidators = [body("userId").notEmpty()];

export const createBandValidators = [
  body("bandName").notEmpty(),
  body("firstPromotedSong").optional().isString(),
  body("secondPromotedSong").optional().isString(),
  body("userId").notEmpty(),

  body("socialMedia").optional(),
  body("socialMedia.facebook").optional().isString(),
  body("socialMedia.instragram").optional().isString(),
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
  body("lineBeacon.*.hardware_id").isString(),
  body("lineBeacon.*.passcode").isString(),

  body("bandImage").optional().notEmpty(),
  body("qrImage").optional().notEmpty(),
];
