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
    try {
        const { data, error } = await supabase
            .from('community')
            .select('*')
            .order('updated_at', { ascending: false })
            ;

        if (error) throw error
        return data
    } catch (error) {
        console.error(error)
    }
}
async function addCommunityToUser(user_id, community_id) {
    try {
        const { data, error } = await supabase
            .from('community_to_user')
            .insert([
                {
                    user_id: user_id,
                    community_id: community_id
                }
            ])

        if (error) throw error
        return data
    } catch (error) {
        console.error(error)
    }
}
async function toggleMembersInCommunity(community_id, function_name) {
    try {
        const { data, error } = await supabase.rpc(function_name, {
            table_name: 'community',
            column_name: "members",
            condition: `id = ${community_id}`,
        });

        if (error) {
            throw error;
        }

        console.log('Column value successfully.', function_name);
    } catch (error) {
        console.error('Error calling function:', function_name, error);
    }
}

module.exports = { addCommunity, getCommunities, addCommunityToUser, toggleMembersInCommunity }