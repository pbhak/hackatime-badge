# hackatime-badge
An API that converts a Hack Club Slack ID and Hackatime project name to a format for Shields.io badges!

# How to run locally
1. Install needed dependencies (`npm i`)
2. Edit PORT variable in server.js as needed and run server.js

# Usage
URL to fetch: `https://img.shields.io/endpoint?url=https://badge.pbhak.hackclub.app/{your Slack user ID}/{project name}`

If adding to a Markdown file, just use standard image syntax: `![Endpoint Badge](https://img.shields.io/endpoint?url=https://badge.pbhak.hackclub.app/{your Slack user ID}/{project name})`
