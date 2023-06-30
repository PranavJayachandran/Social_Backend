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
async function toggleUpvotesDownvotesInComment(comment_id, value, prev) {
    let function_name = "";
    let column_name1 = "";
    let column_name2 = "";
    if (value == 1 && prev == 0) {
        function_name = "increment_column_value";
        column_name1 = "upvote";
    }
    else if (value == 1 && prev == -1) {
        function_name = "update_columns";
        column_name1 = "upvote";
        column_name2 = "downvote";
    }
    else if (value == -1 && prev == 0) {
        function_name = "increment_column_value";
        column_name1 = "downvote";
    }
    else if (value == -1 && prev == 1) {
        function_name = "update_columns";
        column_name1 = "downvote";
        column_name2 = "upvote";
    }
    else if (value == 0) {
        function_name = "decrement_column_value";
        if (prev == 1)
            column_name1 = "upvote";
        else
            column_name1 = "downvote";
    }
    else if (prev == -2) {
        if (value == 1) {
            function_name = "increment_column_value";
            column_name1 = "upvote";
        }
        else {
            function_name = "increment_column_value";
            column_name1 = "downvote";
        }
    }
    if (function_name == "update_columns") {
        try {
            const { data, error } = await supabase.rpc(function_name, {
                table_name: 'comment',
                column1_name: column_name1,
                column2_name: column_name2,
                condition: `id = ${comment_id}`,
            });

            if (error) {
                throw error;
            }

            console.log('Column value updated successfully.', function_name);
        } catch (error) {
            console.error('Error calling increment_column_value function:', error);
        }
    }
    else if (function_name == "increment_column_value" || function_name == "decrement_column_value") {
        try {
            const { data, error } = await supabase.rpc(function_name, {
                table_name: 'comment',
                column_name: column_name1,
                condition: `id = ${comment_id}`,
            });

            if (error) {
                throw error;
            }

            console.log('Column value successfully.', function_name);
        } catch (error) {
            console.error('Error calling function:', function_name, error);
        }
    }
}


module.exports = { addComment, getComment, toggleUpvotesDownvotesInComment }