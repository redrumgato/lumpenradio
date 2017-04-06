# lumpenradio.com

Lumpen Radio's website.

## Setup

1. Install [Hugo](https://gohugo.io)
2. Install node.js (preferably via [nvm](https://github.com/creationix/nvm))
3. Clone the repo
4. `npm install`

### Commands

- `npm start`: Starts Hugo and Webpack with LiveReload
- `npm run build`: Builds the site (Webpack and Hugo) with minifying enabled and stores the result in `public/`
- `npm stop`: Kills all Webpack and Hugo processess. Useful for runaway Webpack daemons.
