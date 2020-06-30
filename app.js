import express from 'express'
import path from 'path'
import template from './src/template'
import ssr from './src/server'
// import data from './assets/data.json'

const app = express()

// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 3000);

let initialState = {
    isFetching: false,
    apps: {}
}

// server rendered home page
app.get('/', (req, res) => {
    const {content, preloadedState} = ssr(initialState)
    console.log(content, preloadedState, "#@!#!#!#!");
    const response = template("HackerNews", preloadedState, content)
    res.setHeader('Cache-Control', 'assets, max-age=604800')
    res.send(response);
});
