# hackatime-badge
An API for Hackatime status badges!

# Usage
URL to fetch: `https://hackatime-badge.hackclub.com/slack_user_id/project_name`

(the project name is case sensitive and must be as listed on hackatime)

If adding to a Markdown file, just use standard image syntax: 
```
![Hackatime Badge](https://hackatime-badge.hackclub.com/slack_user_id/project_name)
```

## Optional parameters
### `label`
Changes the badge label text (the text on the left). Defaults to `hackatime`.

example:
```
https://hackatime-badge.hackclub.com/U07V1ND4H0Q/hackatime-badge?label=hackatime-badge
```
![Hackatime Badge](https://hackatime-badge.hackclub.com/U07V1ND4H0Q/hackatime-badge?label=hackatime-badge)

### `color`
Changes the color of the right side text. Defaults to blue if not given - if an invalid value is given, defaults to green.

Supports hex, RGB, RGBA, HSL, HSLA and CSS named colors

example:
```
https://hackatime-badge.hackclub.com/U07V1ND4H0Q/hackatime-badge?color=darkgreen
```
![Hackatime Badge](https://hackatime-badge.hackclub.com/U07V1ND4H0Q/hackatime-badge?color=darkgreen)


### `aliases`
Adds aliases for projects. Each alias must be as listed on Hackatime, and must be separated with commas (no spaces).

The server will then add individual time worked for each alias to the time of the given project.

example:
```
https://hackatime-badge.hackclub.com/U07V1ND4H0Q/hackatime-badge?aliases=foo,bar
```

# Running locally
1. Install needed dependencies (`npm i`)
2. Edit PORT variable in server.js as needed and run server.js


for any questions, bugs, or concerns, feel free to contact me at @pbhak on the Slack!
