const e = require("express");
const { supabase } = require("./db_client");

async function addComment(content, user_id) {
    try {
        const { data, error } = await supabase
            .from('comment')
            .insert([
                {
                    comment_content: content,
                    user_id: user_id,
                    upvote: 0,
                    downvote: 0,
                }
            ])
            .select('id');

        if (error) throw error
        return data[0].id
    } catch (error) {
        console.error(error)
    }
}

// async function mapUser(posts) {
//     let mapped_posts = [];
//     const asyncTasks = posts.map(async (item) => {
//         try {
//             const { data, error } = await supabase
//                 .from('table_name')
//                 .select('name,user_image')
//                 .eq('id', item.user_id)
//             if (error) throw error
//             mapped_posts.push({ ...item, "username": data[0].name, "user_image": data[0].user_image })

//         } catch (error) {
//             console.error(error)
//         }
//     })
//     await Promise.all(asyncTasks);
//     return mapped_posts;
// }

async function MapCommentToUser(comment, user_id) {
    try {
        const { data, error } = await supabase
            .from('table_name')
            .select('name,user_image')
            .eq('id', user_id)
        if (error) throw error
        comment = { ...comment, "username": data[0].name, "user_image": data[0].user_image }

    } catch (error) {
        console.error(error)
    }
    return comment;
}

async function mapComments(posts) {
    let mapped_posts = [];
    const asyncTasks = posts.map(async (item) => {
        let commentdata = []
        const task = item.comment_id.map(async (comment) => {
            try {
                const { data, error } = await supabase
                    .from('comment')
                    .select('comment_content,upvote,downvote,user_id')
                    .eq('id', comment)
                var commentTemp = { "comment_content": data[0].comment_content, "upvotes": data[0].upvote, "downvotes": data[0].downvote };
                commentTemp = await MapCommentToUser(commentTemp, data[0].user_id);
                commentdata.push(commentTemp);
                if (error) throw error
                console.log(data);

            } catch (error) {
                console.error(error)
            }
        })
        await Promise.all(task);
        console.log(item.id, commentdata);
        mapped_posts.push({ ...item, "comments": commentdata })

    })
    await Promise.all(asyncTasks);
    return mapped_posts;
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
async function addCommentToPost(comment_id, post_id) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .update({ 'comment_id': comment_id })
            .match({ 'id': post_id })
        if (error) throw error
        return data
    } catch (error) {
        console.error(error)
    }
}

module.exports = { addComment, getComment, mapComments, MapCommentToUser, addCommentToPost }