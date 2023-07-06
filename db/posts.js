const { supabase } = require("./db_client");

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
            .from('q')
            .select('*')

        if (error) throw error
        return data
    } catch (error) {
        console.error("Errorr", error)
    }
}
async function toggleLikeDislikeInPost(post_id, value, prev) {
    let function_name = "";
    let column_name1 = "";
    let column_name2 = "";
    if (value == 1 && prev == 0) {
        function_name = "increment_column_value";
        column_name1 = "likes";
    }
    else if (value == 1 && prev == -1) {
        function_name = "update_columns";
        column_name1 = "likes";
        column_name2 = "dislikes";
    }
    else if (value == -1 && prev == 0) {
        function_name = "increment_column_value";
        column_name1 = "dislikes";
    }
    else if (value == -1 && prev == 1) {
        function_name = "update_columns";
        column_name1 = "dislikes";
        column_name2 = "likes";
    }
    else if (value == 0) {
        function_name = "decrement_column_value";
        if (prev == 1)
            column_name1 = "likes";
        else
            column_name1 = "dislikes";
    }
    else if (prev == -2) {
        if (value == 1) {
            function_name = "increment_column_value";
            column_name1 = "likes"
        }
        else {
            function_name = "increment_column_value";
            column_name1 = "dislikes";
        }
    }
    if (function_name == "update_columns") {
        try {
            const { data, error } = await supabase.rpc(function_name, {
                table_name: 'posts',
                column1_name: column_name1,
                column2_name: column_name2,
                condition: `id = ${post_id}`,
            });

            if (error) {
                throw error;
            }

            console.log('Column value updated successfully.');
        } catch (error) {
            console.error('Error calling increment_column_value function:', error);
        }
    }
    else if (function_name == "increment_column_value" || function_name == "decrement_column_value") {
        try {
            const { data, error } = await supabase.rpc(function_name, {
                table_name: 'posts',
                column_name: column_name1,
                condition: `id = ${post_id}`,
            });

            if (error) {
                throw error;
            }

            console.log('Column value incremented successfully.');
        } catch (error) {
            console.error('Error calling function:', function_name, error);
        }
    }
}

module.exports = { addPosts, getPosts, toggleLikeDislikeInPost }