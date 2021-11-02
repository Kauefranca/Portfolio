const sql = require('sqlite3');
const { open } = require('sqlite');
const utils = require('./src/utils');

async function createUrl(url) {
    const db = await open({
        filename: './links.db',
        driver: sql.Database
    });
    await db.exec(`INSERT INTO links (url) VALUES('${url}');`)
    return await db.get(`SELECT id FROM links WHERE url = '${url}';`)
}

(async () => {
    var { id } = await createUrl('https://google.arg');
    console.log(id);
})()

