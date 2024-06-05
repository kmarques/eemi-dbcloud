export default {
  async getAll() {
    const headers = {};
    if (localStorage.getItem("token")) {
      headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    }
    const resp = await fetch("/api/articles", {
      headers,
    });
    const data = await resp.json();
    return data;
  },
};
