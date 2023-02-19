// import {body} from "express-validator";

// export const getEventsValidators = [body("userId").notEmpty()];

// export const createEventValidators = [
//   body("eventName").notEmpty(),
//   body("eventDate").notEmpty(),
//   body("eventTime").notEmpty(),

//   body("socialMedia").optional(),
//   body("socialMedia.facebook").optional().isString(),
//   body("socialMedia.instagram").optional().isString(),
//   body("socialMedia.website").optional().isString(),

//   body("location").isString().notEmpty(),
//   body("googleMapUrl").optional().isString(),

//   body("availableSeat").isInteger().notEmpty(),
//   body("ageLimit").isInteger().optional(),

//   body("ticketType").notEmpty(),
//   body("ticketType.*.free").isBoolean().optional(),
//   body("ticketType.*.price").isInteger().optional(),
//   body("alcoholPermission").notEmpty(),
//   body("alcoholPermission.*.alcohol").isBoolean().optional(),
//   body("alcoholPermission.*.noAlcohol").isBoolean().optional(),

//   body("songRequest").optional().isBoolean(),
//   body("description").optional().isString(),

//   body("eventImage").optional().notEmpty(),
//   body("lineBeacon").optional(),
//   body("lineBeacon.*.hardwareId").isString(),
//   body("lineBeacon.*.passcode").isString(),

//   body("lineUpSchedule").notEmpty(),
//   body("lineUpSchedule.*.time").notEmpty(),
//   body("lineUpSchedule.*.band").notEmpty()
// ];
