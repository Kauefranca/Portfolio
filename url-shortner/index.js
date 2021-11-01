const express = require('express');
const app = express();
const port = 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

app.post('/', (req, res) => {
    let { url } = req.body;
    if (!url) {
        res.status(400);
        return res.json({ error: { code: 400 , message: 'Must provide a url'}})
    }
    if (!isValidHttpUrl(url)) {
        res.status(400);
        return res.json({ error: { code: 400 , message: 'Must provide a valid url'}})
    }
    var id = 'TODO'
    res.send(`<h1>Your url: ${url} is now: http://localhost:${port}/${id}</h1>`)
});

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
