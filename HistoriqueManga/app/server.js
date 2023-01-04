const express = require('express');
const config = require('./conf/config.json');
const app = express();
const dirname = "./public"

app.use("/javascript", express.static(dirname + '/javascript'));
app.use("/css", express.static(dirname + '/css'));
app.use("/html", express.static(dirname + '/html'));

app.get('/', (req, res) => {
    res.sendFile(dirname + '/html/index.html', { root: "." });
});

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});