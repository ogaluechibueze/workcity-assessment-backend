const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  deadline: Date,
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
