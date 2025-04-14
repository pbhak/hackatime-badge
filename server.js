import express from 'express';

const PORT = process.env.port || 3000;
const server = express();

server.get('/', res => res.send("hi! you've reached the root endpoint on my badges api. did you make a wrong request?"));

server.get('/:id/:project', async (req, res) => {
  const stats_url = `https://hackatime.hackclub.com/api/v1/users/${req.params.id}/stats?features=projects`;
  const label = req.query.label ?? 'hackatime';
  const color = req.query.color ?? 'blue';
  
  const project_index = await fetch(stats_url).then(async response => {
    try {
      const projects = (await response.json()).data.projects;
      return projects.indexOf(projects.find(project => project.name == req.params.project));
    } catch {
      res.status(400);
      res.send('Error processing request - is your information correct? (400)');
    }
  });

  res.set('Content-Type', 'image/svg+xml');
  res.set('Cache-Control', 'no-cache');

  const shields_url = `https://img.shields.io/badge/dynamic/json?url=${stats_url}&query=$.data.projects[${project_index}].text&label=${label}&color=${color}`;

  try {
    await fetch(shields_url).then(async request => await request.text().then(response => res.send(response)));
  } catch {
    res.status(500);
    res.send('Error fetching info from shields.io server (500)');
  }
});

server.listen(PORT);
console.log(`started on port ${PORT}`);