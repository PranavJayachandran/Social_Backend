const { supabase } = require("./db_client");

async function getUserData(id) {
    try {
        const { data, error } = await supabase
            .from('table_name')
            .select('*')
            .eq('id', id)

        if (error) throw error
        return data
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


module.exports = { getUserData, mapUser }