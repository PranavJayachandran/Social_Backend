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
async function getFrinds(user_id) {
    try {
        const { data, error } = await supabase
            .from("friends")
            .select("friend1,friend2")
            .or(`friend1.eq.${user_id}l`)
            .or(`friend2.eq.${user_id}l`)

        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { AddFriend, getFrinds };
