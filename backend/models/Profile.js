const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  github: { type: String },
  linkedin: { type: String },
  portfolio: { type: String },
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  links: [LinkSchema],
});

const WorkSchema = new mongoose.Schema({
  company: { type: String, required: true },
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
});

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  education: { type: String },
  skills: [{ type: String }],
  projects: [ProjectSchema],
  work: [WorkSchema],
  links: LinkSchema,
});

module.exports = mongoose.model("Profile", ProfileSchema);
