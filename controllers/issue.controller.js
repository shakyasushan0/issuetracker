import Issue from "../models/Issue.js";
import Project from "../models/Project.js";
import ISSUE_STATUS_FLOW from "../utils/issueStatusFlow.js";

const createIssue = async (req, res) => {
  const { title, description, project, assignee, priority, storyPoint } =
    req.body;
  const user = req.user._id;
  const foundProject = await Project.findById(project);
  if (!foundProject)
    return res.status(404).send({ error: "Project not found!" });

  if (!foundProject.members.includes(user))
    return res
      .status(403)
      .send({ error: "you are not memeber of this project!" });

  const issue = await Issue.create({
    title,
    description,
    project,
    assignee,
    priority,
    storyPoint,
    reportedBy: user,
  });
  res.status(201).send({ message: "Issue created", id: issue._id });
};

const getIssuesByProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId)
    .populate("assignee", "name email -_id")
    .populate("reportedBy", "name email -_id");
  if (!project) return res.status(404).send({ error: "Project not found!" });
  const issues = await Issue.find({ project: projectId });
  res.send(issues);
};

const updateIssue = async (req, res) => {
  const { id } = req.params;
  const issue = await Issue.findById(id);
  if (!issue) return res.status(404).send({ error: "Issue not found!" });
  // approach 1
  //   const updatedIssue = await Issue.findByIdAndUpdate(id, req.body, {
  //     new: true,
  //   });
  // approach 2
  issue.title = req.body.title || issue.title;
  issue.description = req.body.description || issue.description;
  issue.storyPoint = req.body.storyPoint || issue.storyPoint;
  issue.assignee = req.body.assignee || issue.assignee;
  issue.priority = req.body.priority || issue.priority;
  await issue.save();
  res.send({ message: "Issue Updated" });
};

const updateIssueStatus = async (req, res) => {
  const { id } = req.params;
  const issue = await Issue.findById(id);
  if (!issue) return res.status(404).send({ error: "Issue not found!" });
  const status = req.body.status;
  const nextPossibleStatus = ISSUE_STATUS_FLOW[issue.status];
  if (!nextPossibleStatus.includes(status))
    return res.status(400).send({ error: "Invalid Status FLow" });
  issue.status = status;
  await issue.save();
  res.send({ message: "Status Updated" });
};

const getMyIssues = async (req, res) => {
  const user = req.user._id;
  const issues = await Issue.find({ assignee: user })
    .populate("assignee", "name email -_id")
    .populate("reportedBy", "name email -_id");
  res.send(issues);
};

const reportedByMe = async (req, res) => {
  const user = req.user._id;
  const issues = await Issue.find({ reportedBy: user })
    .populate("assignee", "name email -_id")
    .populate("reportedBy", "name email -_id");
  res.send(issues);
};
export {
  createIssue,
  getIssuesByProject,
  updateIssue,
  updateIssueStatus,
  getMyIssues,
  reportedByMe,
};
