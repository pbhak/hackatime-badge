import express from 'express';

const PORT = 41597;
const server = express();

server.get('/:id/:project', async (req, res) => {
  const stats_url = `https://hackatime.hackclub.com/api/v1/users/${req.params.id}/stats?features=projects`;
  const project_time = await fetch(stats_url).then(async response => {
    return (await response.json()).data.projects
      .filter((project_info) => project_info.name == req.params.project)[0].text
  });

  await fetch(`https://img.shields.io/badge/hackatime-${project_time}-${req.params.color ?? 'blue'}`).then(response => {
    res.send(response);
  });
});

server.listen(PORT);
console.log(`started on port ${PORT}`);