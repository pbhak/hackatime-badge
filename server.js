import express from 'express';

const PORT = 41597;
const server = express();

server.get('/:id/:project', async (req, res) => {
  const stats_url = `https://hackatime.hackclub.com/api/v1/users/${req.params.id}/stats?features=projects`;
  const project_index = await fetch(stats_url).then(async response => {
    try {
      const projects = (await response.json()).data.projects;
      return projects.indexOf(projects.filter(project => project.name == req.params.project)[0]);
    } catch {
      res.status(400);
      res.send('Error processing request - is your information correct? (400)');
    }
  });

  res.set('Content-Type', 'image/svg+xml');

  const shields_url = `https://img.shields.io/badge/dynamic/json?url=${stats_url}&query=$.data.projects[${project_index}].text&label=${req.query.label ?? 'hackatime'}&color=${req.query.color ?? 'blue'}`;

  try {
    await fetch(shields_url).then(async request => await request.text().then(response => res.send(response)));
  } catch {
    res.status(500);
    res.send('Error fetching info from shields.io server (500)');
  }
});

server.listen(PORT);
console.log(`started on port ${PORT}`);