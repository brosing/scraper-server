const express = require('express');
const puppeteer = require('puppeteer');

const scrapRepos = require('./src/scrapRepos');
const scrapDevs = require('./src/scrapDevs');
const scrapReadme = require('./src/scrapReadme');

const app = express();
const port = process.env.PORT || 8000;

let browser;

(async () => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })

    app.listen(port, async () => {
        console.log('we are on: ', port);
    })

    browser = await puppeteer.launch()

    app.get('/', async (req, res) => {
        const pageRepos = await browser.newPage();
        const data = await scrapRepos(pageRepos, req.query);

        res.json(data);
        pageRepos.close();
    })

    app.get('/devs', async (req, res) => {
        const pageDevs = await browser.newPage();
        const data = await scrapDevs(pageDevs, req.query);

        res.json(data);
        pageDevs.close();
    })

    app.get('/repo/:name', async (req, res) => {
        const link = req.params.name;
        const pageReadme = await browser.newPage();
        const data = await scrapReadme(pageReadme, link);

        res.json(data);
        pageReadme.close();
    })
})();