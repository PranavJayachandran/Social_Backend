const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getUserData } = require('./db/userData');
const { addPosts, getPosts, toggleLikeDislikeInPost } = require('./db/posts');
const { addComment, getComment, addCommentToPost } = require('./db/comment');
const { addLikesDislikes, toggleLikeDislike } = require('./db/likes_dislikes');
const { addUpvotesDownVotes, toggleUpvotesDownvotes } = require('./db/upvotes_downvotes');


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
    let { content, user_id, post_id } = req.body;
    let id = await addComment(content, user_id, post_id);
    id = JSON.stringify(id);
    res.send(id);
})
app.get("/comment/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await getComment(id));
})

app.post("/likesdislikes", async (req, res) => {
    let post_id = req.body.post_id;
    let value = req.body.value;
    let user_id = req.body.user_id;
    let prev = req.body.prev;
    await toggleLikeDislikeInPost(post_id, value, prev);
    let id = await addLikesDislikes(post_id, value, user_id)
    res.send(JSON.stringify(id));
})

app.put("/likesdislikes", async (req, res) => {
    let post_id = req.body.post_id;
    let value = req.body.value;
    let user_id = req.body.user_id;
    let prev = req.body.prev;
    await toggleLikeDislikeInPost(post_id, value, prev);
    await toggleLikeDislike(post_id, value, user_id)
    res.send("Done");
})

app.post("/upvotesdownvotes", async (req, res) => {
    let comment_id = req.body.comment_id;
    let value = req.body.value;
    let user_id = req.body.user_id;
    let id = await addUpvotesDownVotes(comment_id, value, user_id)
    res.send(JSON.stringify(id));
})

app.put("/upvotesdownvotes", async (req, res) => {
    let comment_id = req.body.comment_id;
    let value = req.body.value;
    let user_id = req.body.user_id;
    await toggleUpvotesDownvotes(comment_id, value, user_id)
    res.send("Done");
})
// app.post("/commenttopost", async (req, res) => {
//     let { content, post_id } = req.body;
//     await addComment(content, post_id);
//     res.send("done");
// })

app.listen(5000, () => console.log("at 5000"));