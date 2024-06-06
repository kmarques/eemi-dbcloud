import client from "./supabase.js";

export default {
  async getAll() {
    const { data, status, statusText } = await client.from("Articles").select();
    if (status === 200) return data;
    else throw new Error();
  },
  async get(articleId) {
    const { data, status, statusText } = await client
      .from("Articles")
      .select()
      .eq("id", articleId)
      .single();
    if (status === 200) return data;
    else throw new Error();
  },
  async update(articleId, inputData) {
    const headers = {
      "Content-Type": "application/json",
    };
    if (localStorage.getItem("token")) {
      headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    }
    const resp = await fetch(`/api/articles/${articleId}`, {
      method: "PUT",
      body: JSON.stringify(inputData),
      headers,
    });
    const data = await resp.json();
    return data;
  },
};
