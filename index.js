const express = require("express");

const server = express();
server.use(express.json());

const projects = [];
let numberOfRequests = 0;

server.use((req, res, next) => {
  numberOfRequests += 1;
  console.log(numberOfRequests);
  return next();
});

const verifyValidTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Missing 'title'" });
  }
  return next();
};

const verifyExistingProject = (req, res, next) => {
  const projectIndex = projects.findIndex(
    project => project.id === parseInt(req.params.id)
  );
  if (projectIndex === -1) {
    return res.status(401).json({ error: "Project not found" });
  }
  req.projectIndex = projectIndex;
  return next();
};

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", verifyExistingProject, (req, res) => {
  return res.json(projects[req.projectIndex]);
});

server.post("/projects", verifyValidTitle, (req, res) => {
  let id = 1;
  projects.forEach(project => {
    if (project.id >= id) {
      id = project.id + 1;
    }
  });
  projects.push({ id, title: req.body.title, tasks: [] });
  return res.json(projects);
});

server.post(
  "/projects/:id/tasks",
  verifyExistingProject,
  verifyValidTitle,
  (req, res) => {
    projects[req.projectIndex].tasks.push(req.body.title);
    return res.json(projects[req.projectIndex]);
  }
);

server.delete("/projects/:id", verifyExistingProject, (req, res) => {
  projects.splice(req.projectIndex, 1);
  return res.send();
});

server.put(
  "/projects/:id",
  verifyValidTitle,
  verifyExistingProject,
  (req, res) => {
    projects[req.projectIndex].title = req.body.title;
    return res.json(projects[req.projectIndex]);
  }
);

server.listen(3000);
