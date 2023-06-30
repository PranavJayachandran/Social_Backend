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
            .select('*, comment(id,comment_content,upvote,downvote,user_id, table_name(name,user_image),upvotes_downvotes(id,comment_id,value)),table_name(name,user_image),likes_dislikes(id,user_id,value)')
            .order('updated_at', { ascending: false });
        if (error) throw error
        return data
    } catch (error) {
        console.error(error)
    }
}

module.exports = { addPosts, getPosts }