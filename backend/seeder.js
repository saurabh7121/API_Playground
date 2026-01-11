const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Profile = require("./models/Profile");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const profileData = {
  name: "John Doe",
  email: "john.doe@example.com",
  education: "Master of Science in Computer Science, University of Example",
  skills: [
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "React",
    "Python",
    "SQL",
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description:
        "Developed a full-stack e-commerce platform using MERN stack.",
      links: [{ github: "https://github.com/johndoe/ecommerce" }],
    },
    {
      title: "Portfolio Website",
      description:
        "Created a personal portfolio website to showcase projects and skills.",
      links: [{ github: "https://github.com/johndoe/portfolio" }],
    },
  ],
  work: [
    {
      company: "Tech Solutions Inc.",
      title: "Software Engineer",
      startDate: new Date("2022-01-01"),
      endDate: new Date("2024-01-01"),
      description: "Developed and maintained web applications.",
    },
  ],
  links: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    portfolio: "https://johndoe.com",
  },
};

const seedDB = async () => {
  try {
    await Profile.deleteMany();
    await Profile.create(profileData);
    console.log("Data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

const destroyDB = async () => {
  try {
    await Profile.deleteMany();
    console.log("Data destroyed successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyDB();
} else {
  seedDB();
}
