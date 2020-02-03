# Cloud Kitchens Order Management Challenge

Welcome to the Cloud Kitchens code challenge

## Getting Started

This project is dependent on [yarn](https://yarnpkg.com/) and [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) so please [install it globally](https://classic.yarnpkg.com/en/docs/install/#mac-stable) on your machine or use the Docker commands

### Running Locally
Install all dependencies
```
yarn
yarn lerna run build # compile the /packages/*
```

Start a local dev server with hot reloading and serve port 3000 => `http://localhost:3000`
```
yarn dev
```

Bundle and optimize all static assets and serve port 3000 => `http://localhost:3000
```
yarn prod
```

### Running Locally With Docker
Start a local dev server with hot reloading and serve port 3000 => `http://localhost:3000`
```
docker-compose -f docker-compose.override.yml up app
```

Bundle and optimize all static assets and serve on port 80 => `http://localhost`
```
docker-compose -f docker-compose.yml up app
```

### Repository Structure
This repository uses [yarn](https://yarnpkg.com/) and [lerna](https://github.com/lerna/lerna) to create a [mono-repo infrastructure](https://github.com/babel/babel/blob/master/packages/README.md). This structure is primarily for future portability but it also allows us to run common commands across packages and version them independently. For example, the `yarn lerna run build` command uses `babel` or `roll-up` to pre-compile packages which is useful for the production build and/or for publishing to an NPM registry. The packages consist of:

| Package | Directory | Functionality |
|--------|-------|-------|
| `@css/browserslist-config` | `/packages/browserslist-config` | Browserslist configuration controlling JS and CSS compilation |
| `@css/components` | `/packages/components` | Components making up the application |
| `@css/redux` | `/packages/redux` | React hooks substitution for Redux and state logic |
| `@css/icons` | `/packages/icons` | Pre-compiled React SVG icons |
| `@css/scripts` | `/packages/components` | Common scripts used for build tooling |

### Technologies Utilized
- [NextJS](https://nextjs.org/)
  - NextJS is one of the top frameworks for developing Server Side Rendered (SSR) React applications. It can be used as a static site generator but also has a production ready [express](https://expressjs.com/) server that is easily customizable. Therefore, it was a top choice for this challenge as other frameworks such as [Gatsby](https://www.gatsbyjs.org/) and [Create React App](https://create-react-app.dev/) are not as robust for applications needing to run a production server.
- [Rebass](https://rebassjs.org/) / [Emotion](https://emotion.sh/docs/introduction) / [Styled Components](https://styled-components.com/)
  - I started off wanting to use Styled Components along with [Styled System](https://styled-system.com/). I ended up using Rebass because I wanted a light weight component library that allowed for theming using CSS in JS. Rebass is built upon Emotion and therefore I opted out of Styled Components but ended up having to use this in one place in the app for keyframe animations. This is not ideal because both Emotion and Styled Components must be bundled. Overall, I really enjoyed the theming available in these frameworks and the declarative nature of Rebass but in the future if I had more time would most likely build a complete style guide using Styled Components and Styled System.
- [SocketIO](https://socket.io/)
  - Due to the requirements of this challenge for use of WebSockets I used SocketIO as it seems to be the defacto choice for use in Node and client side JS. I haven't worked much with WebSockets but this library was straight forward enough although if I had more time I'd probably look into security and authentication concerns around the use of SocketIO to send data from the client to the server.

### Application Concerns and TODO's
- Make the Active vs Historical nav bar sticky
  - The sidebar filter is stick but I didn't put the time in to do the view nav. There is probably an open source React module for this but because I was using Rebass / Emotion I didn't want to import a module that might require some sort of Webpack CSS compilation configuration.
- Investigate SocketIO security
  - Potentially for syncing data back to the server I should have setup a REST endpoint but I just used SocketIO to emit data.
- Make the app responsive for mobile use
  - Again because I'm using Rebass and it's them system I didn't take the time to ramp up on this. There are specific ways to define properties such as `width` using an array that will interact with breakpoints set in the theme and would probably be pretty trivial to implement.
- N seconds filter for the COOKED state
  - I somehow didn't notice this requirement until finishing the application and didn't have time to go back and implement it.

### Testing
This app uses Jest and Enzyme to test the client side application as well as using Jest to test the server application.

To run tests
```
yarn test
```


