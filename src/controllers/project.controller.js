const Project = require('../models/project.model');

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  res.json(await Project.find().populate('client'));
};

exports.getProject = async (req, res) => {
  const project = await Project.findById(req.params.id).populate('client');
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

exports.updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project deleted' });
};

exports.getProjectsByClient = async (req, res) => {
  res.json(await Project.find({ client: req.params.clientId }).populate('client'));
};
