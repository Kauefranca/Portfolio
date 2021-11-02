const express = require('express');
const app = express();
const port = 8888;
const sql = require('sqlite3');
const { open } = require('sqlite');
const utils = require('./src/utils');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

app.post('/', async (req, res) => {
    let { url } = req.body;
    if (!url) {
        res.status(400);
        return res.json({ error: { code: 400 , message: 'Must provide a url'}})
    }
    if (!isValidHttpUrl(url)) {
        res.status(400);
        return res.json({ error: { code: 400 , message: 'Must provide a valid url'}})
    }
    var id = await createUrl(url);
    res.send(`<h1>Shorted!</h1> <p>http://localhost:${port}/${utils.encodeId(id)}</p>`)
});

app.get('*', async (req, res) => {
    var path = req.originalUrl.slice(1);
    res.redirect(await getUrl(path))
})

app.listen(port, () => {
    console.log('Web server running on port: ' + port);
});

function isValidHttpUrl(string) {
    try {
        url = new URL(string);
    } catch (_) {
        return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

async function createUrl(url) {
    const db = await open({
        filename: './links.db',
        driver: sql.Database
    });
    await db.exec(`INSERT INTO links (url) VALUES('${url}');`)
    var { id } = await db.get(`SELECT id FROM links WHERE url = '${url}';`);
    return id;
}

async function getUrl(str) {
    const db = await open({
        filename: './links.db',
        driver: sql.Database
    });
    str = utils.decodeStr(str);
    var { url } = await db.get(`SELECT url FROM links WHERE id = '${str}';`);
    return url;
}