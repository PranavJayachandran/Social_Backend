const { supabase } = require("./db_client");

async function addEvent(community_id, name, description, date) {
  try {
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          community_id: community_id,
          name: name,
          description: description,
          date: date,
        },
      ])
      .select("id");

    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.error(error);
  }
}

async function getEvent() {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Errorr", error);
  }
}
module.exports = { addEvent, getEvent };
