# hackatime-badge
An API for Hackatime status badges!

# Usage
URL to fetch: `https://badge.pbhak.hackclub.app/slack_user_id/project_name`

If adding to a Markdown file, just use standard image syntax: 
```
![Hackatime Badge](https://badge.pbhak.hackclub.app/slack_user_id/project_name)
```

## Optional parameters
### `label`
Changes the badge label text (the text on the left). Defaults to `hackatime`.
```
https://badge.pbhak.hackclub.app/U07V1ND4H0Q/hackatime-badge?label=time
```
![Hackatime Badge](https://badge.pbhak.hackclub.app/U07V1ND4H0Q/hackatime-badge?label=time)

### `color`
Changes the color of the right side text. Defaults to blue if not given - if an invalid value is given, defaults to green.
```
https://badge.pbhak.hackclub.app/U07V1ND4H0Q/hackatime-badge?color=red
```
![Hackatime Badge](https://badge.pbhak.hackclub.app/U07V1ND4H0Q/hackatime-badge?color=red)

# Running locally
1. Install needed dependencies (`npm i`)
2. Edit PORT variable in server.js as needed and run server.js
