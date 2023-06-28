const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getUserData } = require('./db/userData');
const { addPosts, getPosts } = require('./db/posts');


const app = express()
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.send("Server done");
});

app.get("/userData/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await getUserData(id));
})
app.post("/post", async (req, res) => {
    let { content, user_id } = req.body
    await addPosts(content, user_id);
    res.send(content)
})
app.get("/posts", async (req, res) => {
    console.log("Done");
    res.send(await getPosts())
})

app.listen(5000, () => console.log("at 5000"));