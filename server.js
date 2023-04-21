const express = require ("express");
const path = require ('path');
const {readFile} = require("fs/promises")
const getNotes = () => {
    return readFile("db.json", "utf-8") .then(rawNotes => [].concat(JSON.parse(rawNotes)))
}
const app = express ()
const PORT = 3002
//json method req.body
app.use (express.json())
//url bar, no sending queries
app.use (express.urlencoded({extended: false}))
//helps with front end
app.use (express.static("public"))
app.get ("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get ("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})
app.get ("/api/notes", (req, res) => {
    getNotes().then(notes => res.json(notes))
})
app.post ("/api/notes", ({title, text}, res) => {
    getNotes().then(oldNotes => {console.log(title, text)})
})
//destructure out one more time with a .concat
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})