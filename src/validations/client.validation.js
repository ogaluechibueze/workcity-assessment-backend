const Joi = require('joi');

const createClientSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(/^[0-9]{7,15}$/).optional()
});

const updateClientSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(/^[0-9]{7,15}$/).optional()
});

module.exports = { createClientSchema, updateClientSchema };
