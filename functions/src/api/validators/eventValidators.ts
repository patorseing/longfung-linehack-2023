import * as Joi from "joi";

export const getEventSchema = Joi.object({
  userId: Joi.string().required(),
});
