const express = require('express');
const { createProject, getProjects, getProject, updateProject, deleteProject, getProjectsByClient } = require('../controllers/project.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const validate = require('../middleware/validate.middleware');
const { createProjectSchema, updateProjectSchema } = require('../validations/project.validation');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getProjects)
  .post(protect, validate(createProjectSchema), createProject);

router.route('/:id')
  .get(getProject)
  .put(authorize('admin'), validate(updateProjectSchema), updateProject)
  .delete(authorize('admin'), deleteProject);

router.get('/client/:clientId', getProjectsByClient);

module.exports = router;
