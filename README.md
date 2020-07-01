This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### [Try Live demo of this app: Click here to access this application live](https://hnc-spa.herokuapp.com/)

### Server Side rendering

The Virtual DOM can be kept or prepared ahead of time by using Webpack and Babel configuration, reducing the load time when users lands in the webpage.


## Available Scripts

In the project directory, before you run

### Install following dependencies

    "npm": "6.14.5",
    "node": "10.21.0"

### you can start by:

     `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

`npm run test-coverage` 
`npm test` Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

**Note: this is heroku hosted application ``, you can’t build & deploy without owner's permission!**

## Learn More

To know more, check out other repos [Visit GitHub](https://github.com/NRKishanKumar/).

### Making a Progressive Web App

This application uses `bootstrap 4` for responsiveness.

You can access this application via mobile or smaller screens by Adding the app to Home screen from chrome-tools.

### Deployment

This section lets you understand the steps for deployment.

Commit all your changes before proceeding

`$ heroku git:remote -a` <app-name>

`$ git push heroku master`

`$ heroku open`

### `heroku local` fails to minify

You need to install `Heroku CLI` (https://devcenter.heroku.com/articles/heroku-cli)

`heroku local web` to this app locally using production configuration.

### Architecture

![Database Schema](media/Archi.svg)