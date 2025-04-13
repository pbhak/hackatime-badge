import express from 'express';

const PORT = 41597;
const server = express();

function badge_data(time) {
  return JSON.stringify({ schemaVersion: 1, label: 'hackatime', message: time })
}

server.get('/:id/:project', async (req, res) => {
  const stats_url = `https://hackatime.hackclub.com/api/v1/users/${req.params.id}/stats?features=projects`;
  const project_time = await fetch(stats_url).then(async response => {
    return (await response.json()).data.projects
      .filter((project_info) => project_info.name == req.params.project)[0].text
  })

  res.send(badge_data(project_time));
});

server.listen(PORT)
console.log(`started on port ${PORT}`)