const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getUserData } = require('./db/userData');
const { addPosts, getPosts } = require('./db/posts');
const { addComment, getComment, addCommentToPost } = require('./db/comment');


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
    let id = await addPosts(content, user_id);
    res.send(JSON.stringify(id))
})
app.get("/posts", async (req, res) => {
    console.log("Done");
    var posts = await getPosts();
    res.send(posts)
})
app.post("/comment", async (req, res) => {
    let { content, user_id } = req.body;
    let id = await addComment(content, user_id);
    id = JSON.stringify(id);
    res.send(id);
})
app.get("/comment/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await getComment(id));
})

app.post("/commenttopost", async (req, res) => {
    let { comment_id, post_id } = req.body;
    await addCommentToPost(comment_id, post_id);
    res.send("done");
})

app.listen(5000, () => console.log("at 5000"));