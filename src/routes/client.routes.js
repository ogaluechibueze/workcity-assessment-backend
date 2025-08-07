const express = require('express');
const { createClient, getClients, getClient, updateClient, deleteClient } = require('../controllers/client.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const validate = require('../middleware/validate.middleware');
const { createClientSchema, updateClientSchema } = require('../validations/client.validation');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getClients)
  .post(protect, validate(createClientSchema), createClient);

router.route('/:id')
  .get(getClient)
  .put(authorize('admin'), validate(updateClientSchema), updateClient)
  .delete(authorize('admin'), deleteClient);

module.exports = router;
