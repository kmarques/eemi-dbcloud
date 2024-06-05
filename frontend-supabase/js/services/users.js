import client from "./supabase.js";

export default {
  async login(credentials) {
    const { data, error } = await client.auth.signInWithPassword(credentials);
    if (error) {
      console.log(error);
      throw new Error();
    }

    return data.session.access_token;
  },
};
