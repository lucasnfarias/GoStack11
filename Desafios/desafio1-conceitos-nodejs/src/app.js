const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const data = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(data);

  return response.json(data);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs, likes } = request.body;
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Wrong ID!' })
  }

  const repo = {
    id,
    title,
    url,
    techs,
    likes: likes ? repositories[repoIndex].likes : undefined
  };

  repositories[repoIndex] = {
    id,
    title: title ? title : repositories[repoIndex].title,
    url: url ? url : repositories[repoIndex].url,
    techs: techs ? techs : repositories[repoIndex].techs,
    likes: repositories[repoIndex].likes
  };

  return response.json(repo);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({ error: 'Wrong ID!' })
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Wrong ID!' })
  }

  const repo = repositories[repoIndex];
  
  
  repo.likes += 1;

  repositories[repoIndex] = repo;

  return response.json(repo)
});

module.exports = app;
