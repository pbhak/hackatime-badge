# hackatime-badge

![Uptime Badge](https://img.shields.io/uptimerobot/status/m800538024-884a2991404da343e76934d6?color=blue)

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
Changes the badge label text (the text on the left). Defaults to `hackatime`. Must be URL encoded for spaces/special characters.

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

### other parameters
Any parameters not recognized will be passed to Shields.io, so you can use any [Shields-supported style parameters](https://shields.io/badges):

* `style` - default `flat`
    * available values: `flat`, `flat-square`, `plastic`, `for-the-badge`, `social`
* `logo`
    * An icon slug from [Simple Icons](https://simpleicons.org/) to be displayed before the left side label
    * Slugs can be copied by clicking the icon title or they can be found in the [slugs.md](https://github.com/simple-icons/simple-icons/blob/master/slugs.md) file in the simple-icons repo
    * See [this page](https://shields.io/docs/logos) for information on using custom icons 
* `logoColor`
    * Color of the logo (hex, RGB, RGBA, HSL, HSLA, or CSS named color)
    * Only works with Simple Icons logos
* `logoSize`
    * Can set logos to resize adaptively by changing this to `auto`
    * Only works with Simple Icons logos
* `labelColor`
    * Background color of the label (left part) - hex, RGB, RGBA, HSL, HSLA, or CSS named color
* `link`
    * Specifies what clicking on the left or right hand side of a badge does
    * This parameter only works if your badge is in an `<object>` tag
        * you can also achieve the same result with a wrapped `<a>`!


# Running locally
1. Install needed dependencies (`npm i`)
2. Edit PORT variable in server.js as needed and run server.js


for any questions, bugs, or concerns, feel free to contact me at @pbhak on the Slack!
