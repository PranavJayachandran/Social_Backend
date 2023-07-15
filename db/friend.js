const { supabase } = require("./db_client");

async function AddFriend(friend1, friend2) {
    try {
        const { data, error } = await supabase
            .from("friends")
            .insert([
                {
                    friend1: friend1,
                    friend2: friend2
                },
            ])
            .select("id");

        if (error) throw error;
        return data[0].id;
    } catch (error) {
        console.error(error);
    }
}
async function getFriends(user_id) {
    try {
        const { data, error } = await supabase
            .from("friends")
            .select("friend2")
            .or(`and(friend1.eq.${user_id})`)


        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
    }
}
async function unFriend(friend1, friend2) {
    try {
        const { data, error } = await supabase
            .from("friends")
            .delete()
            .or(`and(friend1.eq.${friend1},friend2.eq.${friend2})`)
        return "Deleted";
    } catch (error) {
        console.error(error);
    }
}

module.exports = { AddFriend, getFriends, unFriend };
