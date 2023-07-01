const { mapComments } = require("./comment");
const { supabase } = require("./db_client");
const { mapUser } = require("./userData");

async function addCommunity(cover_image, banner_image, description, name) {
    try {
        const { data, error } = await supabase
            .from('community')
            .insert([
                {
                    cover_image: cover_image,
                    banner_image: banner_image,
                    description: description,
                    members: 0,
                    name: name
                }
            ])
            .select('id')

        if (error) throw error
        return data[0].id
    } catch (error) {
        console.error(error)
    }
}




async function getCommunities() {
    let posts;
    try {
        const { data, error } = await supabase
            .from('community')
            .select('*')
            .order('updated_at', { ascending: false });
        if (error) throw error
        return data
    } catch (error) {
        console.error(error)
    }
}

module.exports = { addCommunity, getCommunities }