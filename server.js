import express from "express";

const PORT = process.env.port || 3000;
const server = express();

let requests = {
  totalRequests: 0,
  requestsInLast24Hours: 0,
  requestsInLast7Days: 0,
  requestTimeStamps: [],
};

server.use("/:id/:project", (req, res, next) => {
  requests.requestTimeStamps.push(Date.now());
  requests.totalRequests++;

  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  requests.requestsInLast24Hours = requests.requestTimeStamps.filter((ts) => ts > oneDayAgo).length;
  requests.requestsInLast7Days = requests.requestTimeStamps.filter((ts) => ts > oneWeekAgo).length;

  next();
});

server.get("/", (req, res) =>
  res.redirect("https://github.com/pbhak/hackatime-badge")
);

server.get("/:id/:project", async (req, res) => {
  const stats_url = `https://hackatime.hackclub.com/api/v1/users/${req.params.id}/stats?features=projects`;
  const label = req.query.label ?? "hackatime";
  const color = req.query.color ?? "blue";

  const project_index = await fetch(stats_url).then(async (response) => {
    try {
      const projects = (await response.json()).data.projects;
      return projects.indexOf(
        projects.find((project) => project.name == req.params.project)
      );
    } catch {
      res.status(400);
      res.send("Error processing request - is your information correct? (400)");
    }
  });

  res.set("Content-Type", "image/svg+xml");
  res.set("Cache-Control", "no-cache");

  const shields_url = `https://img.shields.io/badge/dynamic/json?url=${stats_url}&query=$.data.projects[${project_index}].text&label=${label}&color=${color}`;

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

server.get("/analytics", (req, res) => {
  res.send(requests);
});

server.listen(PORT);
console.log(`started on port ${PORT}`);
