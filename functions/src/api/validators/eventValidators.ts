import * as JoiBase from "joi";
import JoiDate from "@joi/date";

import { DATE_FORMAT_REGEX } from "../constants";

const Joi = JoiBase.extend(JoiDate);

const socialMediaSchema = Joi.object({
  facebook: Joi.string().allow(null, ""),
  instagram: Joi.string().allow(null, ""),
  tiktok: Joi.string().allow(null, ""),
  website: Joi.string().allow(null, ""),
});

const eventLocationSchema = Joi.object({
  address: Joi.string().required(),
  googleMapLink: Joi.string().allow(null, ""),
});

const ticketTypeSchema = Joi.object({
  free: Joi.boolean(),
  price: Joi.number().allow(null),
});

const lineBeaconSchema = Joi.object({
  hardwareId: Joi.string().required(),
  passcode: Joi.string().required(),
});

const lineUpSchema = Joi.object({
  startTime: Joi.string().regex(DATE_FORMAT_REGEX).required(),
  endTime: Joi.string().regex(DATE_FORMAT_REGEX).required(),
  bandName: Joi.string().required(),
});

export const getEventSchema = Joi.object({
  userId: Joi.string().required(),
});

export const createEventSchema = Joi.object({
  userId: Joi.string().required(),
  eventName: Joi.string().required(),
  eventDate: Joi.date().format(["DD/MM/YYYY"]),
  eventStartTime: Joi.string().regex(DATE_FORMAT_REGEX),
  eventEndTime: Joi.string().regex(DATE_FORMAT_REGEX),
  socialMedia: socialMediaSchema,
  eventLocation: eventLocationSchema,
  availableSeat: Joi.number().allow(null),
  ageLimitation: Joi.number().allow(null),
  ticketType: ticketTypeSchema,
  alcoholFree: Joi.boolean().allow(null).default(false),
  songRequested: Joi.boolean().allow(null),
  eventDescription: Joi.string().allow(null, ""),
  lineBeacon: Joi.array().items(lineBeaconSchema),
  lineUp: Joi.array().items(lineUpSchema),
});
