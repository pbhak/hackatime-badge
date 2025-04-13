import express, { response } from 'express';

const PORT = 41597;
const server = express();

server.get('/:id/:project', async (req, res) => {
  const stats_url = `https://hackatime.hackclub.com/api/v1/users/${req.params.id}/stats?features=projects`;
  const project_time = await fetch(stats_url).then(async response => {
    try {
      return (await response.json()).data.projects
        .filter((project_info) => project_info.name == req.params.project)[0].text
    } catch {
      res.status(400);
      res.send('Error processing request - is your information correct? (400)');
    }
  });

  try {
    await fetch(`https://img.shields.io/badge/${req.query.label ?? 'hackatime'}-${project_time}-${req.query.color ?? 'blue'}`)
      .then(async request => await request.text().then(response => res.send(response)));
  } catch {
    res.status(500);
    res.send('Error fetching info from shields.io server (500)');
  }
});

server.listen(PORT);
console.log(`started on port ${PORT}`);