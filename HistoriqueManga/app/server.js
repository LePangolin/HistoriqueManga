const express = require('express');
const bodyParser = require('body-parser');
const config = require('./conf/config.json');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const { insertOneElementSaved, findAllElementsSaved, updateOneEpisodeElementSaved, deleteOneElementSaved, updateOnePosterElementSaved, updateFinishedElementSaved, updateRatingElement } = require('./database/database.js');
const dirname = "./public"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


app.use("/javascript", express.static(dirname + '/javascript'));
app.use("/css", express.static(dirname + '/css'));
app.use("/images", express.static(dirname + '/images'));

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

app.post("/api/element/rate", (req, res) => {
    updateRatingElement(req.body.Title, req.body.Rating, (error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send("Element updated");
        }
    });
});


// route for uploading files
app.post('/upload', (req, res) => {
    console.log(req);
    if (!req.body.Poster) {
        return res.status(400).send({message : 'No files were uploaded.'});
    }
    else {
        let sampleFile = req.body.Poster;
        // crée un fichier 
        fs.writeFileSync
    }
});

app.get('/', (req, res) => {
    res.sendFile(dirname + '/html/index.html', { root: "." });
});

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});