const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const notes = require("./db/db.json");
const {DH_CHECK_P_NOT_SAFE_PRIME} = require("constants");

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('./public'));

//Get API db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(_dirname, "./db/db.json"))
});

//Add notes to db.json
app.post("/api/notes", (req,res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});


// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//notes.html
app.get("/notes",(req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//Listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);