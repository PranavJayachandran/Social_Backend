const { supabase } = require("./db_client");

async function addPosts(content, user_id) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .insert([
                {
                    content: content,
                    user_id: user_id
                }
            ])

        if (error) throw error
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}

async function mapUser(posts) {
    let mapped_posts = [];
    const asyncTasks = posts.map(async (item) => {
        try {
            const { data, error } = await supabase
                .from('table_name')
                .select('name,user_image')
                .eq('id', item.user_id)
            if (error) throw error
            mapped_posts.push({ ...item, "username": data[0].name, "user_image": data[0].user_image })

        } catch (error) {
            console.error(error)
        }
    })
    await Promise.all(asyncTasks);
    return mapped_posts;
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
        // posts=mapComments(posts)
        return posts
    } catch (error) {
        console.error(error)
    }
}

module.exports = { addPosts, getPosts }