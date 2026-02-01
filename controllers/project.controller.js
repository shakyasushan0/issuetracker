import Project from "../models/Project.js";

const addProject = async (req, res) => {
  const { name, description, key, members } = req.body;
  const project = await Project.create({
    name,
    description,
    key,
    members,
    createdBy: req.user._id,
  });
  res.send({ message: "Project created!" });
};

const getProjects = async (req, res) => {
  const projects = await Project.find().populate(
    "createdBy",
    "name email -_id",
  );
  res.send(projects);
};

const getProjectById = async (req, res) => {
  const id = req.params.id;
  const project = await Project.findById(id);
  if (!project) return res.status(404).send({ error: "Project not found!" });
  res.send(project);
};

export { addProject, getProjects, getProjectById };
