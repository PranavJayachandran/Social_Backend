const { supabase } = require("./db_client");

async function getUserData(id) {
  try {
    const { data, error } = await supabase
      .from("table_name")
      .select(
        "name,interests,socials,user_image ,event_to_user(event_id) ,community_to_user(community_id,community(*))"
      )
      .eq("id", id);

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error(error);
  }
}
async function mapUser(posts) {
  let mapped_posts = [];
  const asyncTasks = posts.map(async (item) => {
    try {
      const { data, error } = await supabase
        .from("table_name")
        .select("name,user_image")
        .eq("id", item.user_id);
      if (error) throw error;
      mapped_posts.push({
        ...item,
        username: data[0].name,
        user_image: data[0].user_image,
      });
    } catch (error) {
      console.error(error);
    }
  });
  await Promise.all(asyncTasks);
  return mapped_posts;
}

async function CreateUser(email, id) {
  try {
    const { data, error } = await supabase
      .from("table_name")
      .insert([
        {
          id: id,
          email: email,
        },
      ])
      .select("id");

    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getUserData, mapUser, CreateUser };
