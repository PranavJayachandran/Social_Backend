const { mapComments } = require("./comment");
const { supabase } = require("./db_client");
const { mapUser } = require("./userData");

async function addPosts(content, user_id) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .insert([
                {
                    content: content,
                    user_id: user_id,
                    likes: 0,
                    dislikes: 0,
                    comment_id: []
                }
            ])
            .select('id')

        if (error) throw error
        return data[0].id
    } catch (error) {
        console.error(error)
    }
}




async function getPosts() {
    let posts;
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('updated_at', { ascending: false });
        if (error) throw error
        posts = await mapUser(data);
        posts = await mapComments(posts);
        return posts
    } catch (error) {
        console.error(error)
    }
}

module.exports = { addPosts, getPosts }