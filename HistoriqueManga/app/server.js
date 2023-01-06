const express = require('express');
const bodyParser = require('body-parser');
const config = require('./conf/config.json');
const app = express();
const { insertOneElementSaved, findAllElementsSaved, updateOneEpisodeElementSaved, deleteOneElementSaved, updateOnePosterElementSaved, updateFinishedElementSaved } = require('./database/database.js');
const dirname = "./public"

app.use(bodyParser.json());

app.use("/javascript", express.static(dirname + '/javascript'));
app.use("/css", express.static(dirname + '/css'));

let json = require('./public/json/database.json');


app.post("/api/elements", (req, res) => {
    insertOneElementSaved(req.body, (error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send("Element added");
        }
    });
});

app.get("/api/elements", (req, res) => {
    findAllElementsSaved((error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send(result);
        }
    });
});

app.delete("/api/element", (req, res) => {
    deleteOneElementSaved(req.body.Title, (error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send("Element deleted");
        }
    });
});

app.post("/api/element/episode", (req, res) => {
    updateOneEpisodeElementSaved(req.body.Title, req.body.operator, (error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send("Element updated");
        }
    });
});

app.post("/api/element/poster", (req, res) => {
    updateOnePosterElementSaved(req.body.Title, req.body.Poster, (error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send("Element updated");
        }
    });
});

app.post("/api/element/finished", (req, res) => {
    updateFinishedElementSaved(req.body.Title, req.body.Finished, (error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send("Element updated");
        }
    });
});


app.get('/', (req, res) => {
    res.sendFile(dirname + '/html/index.html', { root: "." });
});

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});