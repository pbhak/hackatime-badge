import express from "express";

const PORT = process.env.port || 3000;
const server = express();

function secondsToHours(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return (hours ? hours + "h " : "") + minutes + "m";
}

async function getSecondsForProject(userId, projectName) {
  const stats_url = `https://hackatime.hackclub.com/api/summary?user=${userId}`;

  const project = await fetch(stats_url)
    .then(async (response) => await response.json())
    .then((json) => json.projects)
    .then((projects) =>
      projects.find((project) => project.key === projectName)
    );

  return project ? project.total : 0;
}

server.get("/", (req, res) =>
  res.redirect("https://github.com/pbhak/hackatime-badge")
);

server.get("/:id/:project", async (req, res) => {
  const label = req.query.label ?? "hackatime";
  const color = req.query.color ?? "blue";
  const aliases = req.query.aliases ? req.query.aliases.split(",") : [];

  let projectTime = await getSecondsForProject(
    req.params.id,
    req.params.project
  );

  if (projectTime === 0) res.sendStatus(400);

  for (const alias of [...new Set(aliases)]) {
    if (alias !== req.params.project) {
      await getSecondsForProject(req.params.id, alias).then(
        (seconds) => (projectTime += seconds)
      );
    }
  }

  res.set("Content-Type", "image/svg+xml");
  res.set("Cache-Control", "no-cache");

  const shields_url = `https://img.shields.io/badge/hackatime-${secondsToHours(
    projectTime
  )}-${color}?label=${label}`;

  try {
    await fetch(shields_url).then(
      async (request) =>
        await request.text().then((response) => res.send(response))
    );
  } catch {
    res.status(500);
    res.send("Error fetching info from shields.io server (500)");
  }
});

server.listen(PORT);
console.log(`started on port ${PORT}`);
