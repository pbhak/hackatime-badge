import express from 'express';

const PORT = 41597;
const server = express();

server.get('/badge/:id/:project', async (req, res) => {
  const stats_url = `https://hackatime.hackclub.com/api/v1/users/${req.params.id}/stats?features=projects`;
  const project_info = (await fetch(stats_url)).json().projects;

  console.log(project_info);
});

server.listen(PORT)