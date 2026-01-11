const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// @route   GET api/profile
// @desc    Get profile
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile
// @desc    Create or update profile
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, education, skills, projects, work, links } = req.body;

  // Build profile object
  const profileFields = {};
  if (name) profileFields.name = name;
  if (email) profileFields.email = email;
  if (education) profileFields.education = education;
  if (skills) {
    profileFields.skills = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());
  }
  if (projects) profileFields.projects = projects;
  if (work) profileFields.work = work;
  if (links) profileFields.links = links;

  try {
    let profile = await Profile.findOne();

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { _id: profile._id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    } else {
      // Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

// @route   GET api/profile/projects
// @desc    Get projects by skill or all projects
// @access  Public
router.get("/projects", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    if (req.query.skill) {
      const skill = req.query.skill.toLowerCase();
      const filteredProjects = profile.projects.filter(
        (project) =>
          project.description.toLowerCase().includes(skill) ||
          project.title.toLowerCase().includes(skill)
      );
      return res.json(filteredProjects);
    } else {
      res.json(profile.projects);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/skills/top
// @desc    Get top skills (placeholder for more complex logic)
// @access  Public
router.get("/skills/top", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    // For now, return all skills. In a real app, this would involve more complex logic
    res.json(profile.skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/search
// @desc    Search profile by query string
// @access  Public
router.get("/search", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    const query = req.query.q.toLowerCase();
    const results = {};

    // Search in name, email, education
    if (profile.name.toLowerCase().includes(query)) results.name = profile.name;
    if (profile.email.toLowerCase().includes(query))
      results.email = profile.email;
    if (profile.education && profile.education.toLowerCase().includes(query))
      results.education = profile.education;

    // Search in skills
    results.skills = profile.skills.filter((skill) =>
      skill.toLowerCase().includes(query)
    );

    // Search in projects
    results.projects = profile.projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
    );

    // Search in work experience
    results.work = profile.work.filter(
      (job) =>
        job.company.toLowerCase().includes(query) ||
        job.title.toLowerCase().includes(query) ||
        (job.description && job.description.toLowerCase().includes(query))
    );

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/skills
// @desc    Add a new skill to the profile
// @access  Public
router.put("/skills", async (req, res) => {
  const { skill } = req.body;

  if (!skill) {
    return res.status(400).json({ msg: "Skill is required" });
  }

  try {
    let profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    if (profile.skills.includes(skill)) {
      return res.status(400).json({ msg: "Skill already exists" });
    }

    profile.skills.unshift(skill); // Add new skill to the beginning
    await profile.save();

    res.json(profile.skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
