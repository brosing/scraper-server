const express = require('express');
const puppeteer = require('puppeteer');

const scrapRepos = require('./src/scrapRepos');
const scrapDevs = require('./src/scrapDevs');
const scrapReadme = require('./src/scrapReadme');

const app = express();
const port = process.env.PORT || 8000;

let browser, page;

const runBrowser = async () => {
    browser = await puppeteer.launch();
    // page.on('error', (err) => {
    //     console.log(err);
    // })
    // page.setDefaultNavigationTimeout(10000);
};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, async () => {
    await runBrowser();
    console.log('we are on: ', port);
});

app.get('/', async (req, res) => {
    page = await browser.newPage();

    const data = await scrapRepos(page, req.query);
    res.json(data);
});

app.get('/devs', async (req, res) => {
    page = await browser.newPage();

    const data = await scrapDevs(page, req.query);
    res.json(data);
});

app.get('/repo/:name', async (req, res) => {
    page = await browser.newPage();

    const link = req.params.name;
    const data = await scrapReadme(page, link);
    res.json(data);
});