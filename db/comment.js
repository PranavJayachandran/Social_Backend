const { supabase } = require("./db_client");

async function addComment(content, user_id, post_id) {
    try {
        const { data, error } = await supabase
            .from('comment')
            .insert([
                {
                    comment_content: content,
                    user_id: user_id,
                    upvote: 0,
                    downvote: 0,
                    post_id: post_id
                }
            ])
            .select('id');

        if (error) throw error
        return data[0].id
    } catch (error) {
        console.error(error)
    }
}

async function getComment(id) {
    try {
        const { data, error } = await supabase
            .from('comment')
            .select('*')
            .eq('id', id)
        if (error) throw error
        return data
    } catch (error) {
        console.error(error)
    }
}
// async function addComment(comment_id, post_id) {
//     try {
//         const { data, error } = await supabase
//             .from('posts')
//             .update({ 'comment_id': comment_id })
//             .match({ 'id': post_id })
//         if (error) throw error
//         return data
//     } catch (error) {
//         console.error(error)
//     }
// }

module.exports = { addComment, getComment }