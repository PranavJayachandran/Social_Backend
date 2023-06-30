const { supabase } = require("./db_client");

async function addUpvotesDownVotes(comment_id, value, user_id) {
    try {
        const { data, error } = await supabase
            .from('upvotes_downvotes')
            .insert([
                {
                    comment_id: comment_id,
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

async function toggleUpvotesDownvotes(comment_id, value, user_id) {
    try {
        const { data, error } = await supabase
            .from('upvotes_downvotes')
            .update({
                'value': value
            })
            .match({ 'user_id': user_id, 'comment_id': comment_id })

        if (error) throw error
    } catch (error) {
        console.error(error)
    }
}

module.exports = { addUpvotesDownVotes, toggleUpvotesDownvotes };