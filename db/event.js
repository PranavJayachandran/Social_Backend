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

async function getAllEvent() {
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

async function getEvent(id) {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id);

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Errorr", error);
  }
}

const getEventByCommunity = async (id) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("community_id", id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Errorr", error);
  }
};

const joinUserToEvent = async (event_id, user_id) => {
  try {
    const { data, error } = await supabase.from("event_to_user").insert([
      {
        user_id: user_id,
        event_id: event_id,
      },
    ]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Errorr", error);
  }
};

const removeUserFromEvent = async (event_id, user_id) => {
  try {
    const { data, error } = await supabase
      .from("event_to_user")
      .delete()
      .match({ user_id: user_id })
      .match({ event_id: event_id });
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  addEvent,
  getAllEvent,
  getEvent,
  getEventByCommunity,
  joinUserToEvent,
  removeUserFromEvent,
};
