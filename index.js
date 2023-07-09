const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { getUserData } = require("./db/userData");
const { addPosts, getPosts, toggleLikeDislikeInPost } = require("./db/posts");
const {
  addComment,
  getComment,
  addCommentToPost,
  toggleUpvotesDownvotesInComment,
} = require("./db/comment");
const { addLikesDislikes, toggleLikeDislike } = require("./db/likes_dislikes");
const {
  addUpvotesDownVotes,
  toggleUpvotesDownvotes,
} = require("./db/upvotes_downvotes");
const {
  getCommunities,
  addCommunity,
  addCommunityToUser,
  toggleMembersInCommunity,
  removeUserfromCommunity,
} = require("./db/community");
const {
  getEvent,
  addEvent,
  getEventByCommunity,
  joinUserToEvent,
  getAllEvent,
  removeUserFromEvent,
} = require("./db/event");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Server done");
});

app.get("/userData/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await getUserData(id));
});
app.post("/post", async (req, res) => {
  let { content, user_id } = req.body;
  let id = await addPosts(content, user_id);
  res.send(JSON.stringify(id));
});
app.get("/posts", async (req, res) => {
  console.log("Done");
  var posts = await getPosts();
  res.send(posts);
});
app.post("/comment", async (req, res) => {
  let { content, user_id, post_id } = req.body;
  let id = await addComment(content, user_id, post_id);
  id = JSON.stringify(id);
  res.send(id);
});
app.get("/comment/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await getComment(id));
});

app.post("/likesdislikes", async (req, res) => {
  let post_id = req.body.post_id;
  let value = req.body.value;
  let user_id = req.body.user_id;
  let prev = req.body.prev;
  await toggleLikeDislikeInPost(post_id, value, prev);
  let id = await addLikesDislikes(post_id, value, user_id);
  res.send(JSON.stringify(id));
});

app.put("/likesdislikes", async (req, res) => {
  let post_id = req.body.post_id;
  let value = req.body.value;
  let user_id = req.body.user_id;
  let prev = req.body.prev;
  await toggleLikeDislikeInPost(post_id, value, prev);
  await toggleLikeDislike(post_id, value, user_id);
  res.send("Done");
});

app.post("/upvotesdownvotes", async (req, res) => {
  let comment_id = req.body.comment_id;
  let value = req.body.value;
  let user_id = req.body.user_id;
  let prev = req.body.prev;
  await toggleUpvotesDownvotesInComment(comment_id, value, prev);
  let id = await addUpvotesDownVotes(comment_id, value, user_id);
  res.send(JSON.stringify(id));
});

app.put("/upvotesdownvotes", async (req, res) => {
  let comment_id = req.body.comment_id;
  let value = req.body.value;
  let user_id = req.body.user_id;
  let prev = req.body.prev;
  await toggleUpvotesDownvotesInComment(comment_id, value, prev);
  await toggleUpvotesDownvotes(comment_id, value, user_id);
  res.send("Done");
});
app.post("/commenttopost", async (req, res) => {
  let { content, post_id } = req.body;
  await addComment(content, post_id);
  res.send("done");
});

app.post("/community", async (req, res) => {
  let { cover_image, banner_image, description, name } = req.body;
  let id = await addCommunity(cover_image, banner_image, description, name);
  res.send(JSON.stringify(id));
});
app.get("/communities", async (req, res) => {
  var communities = await getCommunities();
  res.send(communities);
});

app.post("/communitytouser", async (req, res) => {
  let { user_id, community_id } = req.body;
  let id = await addCommunityToUser(user_id, community_id);
  await toggleMembersInCommunity(community_id, "increment_column_value");
  res.send(JSON.stringify(id));
});
app.delete("/communitytouser", async (req, res) => {
  let { user_id, community_id } = req.body;
  await removeUserfromCommunity(user_id, community_id);
  await toggleMembersInCommunity(community_id, "decrement_column_value");
  res.send("Delee");
});

app.post("/event", async (req, res) => {
  let { community_id, name, description, date } = req.body;
  let id = await addEvent(community_id, name, description, date);
  res.send(JSON.stringify(id));
});
app.get("/events", async (req, res) => {
  var events = await getAllEvent();
  res.send(events);
});
app.get("/event/:id", async (req, res) => {
  let community_id = req.params.id;
  res.send(await getEvent(community_id));
});
app.get("/eventcommunity/:id", async (req, res) => {
  let community_id = req.params.id;
  res.send(await getEventByCommunity(community_id));
});
app.post("/joinevent", async (req, res) => {
  let { event_id, user_id } = req.body;
  await joinUserToEvent(event_id, user_id);
  res.send("Done");
});
app.delete("/leaveevent", async (req, res) => {
  let { event_id, user_id } = req.body;
  await removeUserFromEvent(event_id, user_id);
  res.send("Done");
});
app.listen(5000, () => console.log("at 5000"));
