const { supabase } = require("./db_client");

async function addLikesDislikes(post_id, value, user_id) {
    try {
        const { data, error } = await supabase
            .from('likes_dislikes')
            .insert([
                {
                    post_id: post_id,
                    value: value,
                    user_id: user_id
                }
            ])
            .select('id');

        if (error) throw error
        return data[0].id
    } catch (error) {
        console.error(error)
    }
}

async function toggleLikeDislike(post_id, value, user_id) {
    try {
        const { data, error } = await supabase
            .from('likes_dislikes')
            .update({
                'value': value
            })
            .match({ 'user_id': user_id, 'post_id': post_id })

        if (error) throw error
    } catch (error) {
        console.error(error)
    }
}

module.exports = { addLikesDislikes, toggleLikeDislike };