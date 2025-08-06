const Joi = require('joi');

const createProjectSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
  deadline: Joi.date().optional(),
  client: Joi.string().hex().length(24).required()
});

const updateProjectSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
  deadline: Joi.date().optional(),
  client: Joi.string().hex().length(24).optional()
});

module.exports = { createProjectSchema, updateProjectSchema };
