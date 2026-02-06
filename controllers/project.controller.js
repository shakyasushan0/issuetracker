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

const addMember = async (req, res) => {
  const projectId = req.params.id;
  const { member } = req.body;
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).send({ error: "Project not found!" });
  if (project.members.includes(member))
    return res.status(400).send({ error: "Member already exists" });
  project.members.push(member);
  await project.save();
  res.send({ message: "Member added!" });
};

const removeMember = async (req, res) => {
  const projectId = req.params.id;
  const { member } = req.body;
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).send({ error: "Project not found!" });
  if (!project.members.includes(member))
    return res.status(400).send({ error: "Member doesnot exist" });
  // filter
  project.members = project.members.filter((m) => m != member);
  // splice
  // const memberIndex = project.members.indexOf(member)
  //project.memebers.splice(memberIndex,1)
  await project.save();
  res.send({ message: "Member removed" });
};

export { addProject, getProjects, getProjectById, addMember, removeMember };
