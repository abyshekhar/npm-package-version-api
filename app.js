const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(morgan('dev'))
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const https = require('https')
const packages = require('./package-list.json')
const agent = new https.Agent({
    rejectUnauthorized: false,
})
app.get('/', (req, res, next) => {
    packageVersion = [];
    [...packages].map(async package => {
        ver = await axios
            .get(package.url, {
                httpsAgent: agent
            })
            .then(function (response) {
                const dom = new JSDOM(response.data);
                return dom.window.document.querySelector('p.f2874b88').textContent;
            });
        console.log(ver);
    })
    res.status(200).send('');
});

module.exports = app