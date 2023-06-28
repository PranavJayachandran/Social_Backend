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


module.exports = { getUserData }