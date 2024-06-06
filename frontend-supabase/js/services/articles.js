import client from "./supabase.js";

export default {
  async getAll() {
    const {
      data: { user },
    } = await client.auth.getUser();
    const query = client.from("Articles").select();
    if (user) {
      query.or(
        `status.eq.PUBLISHED, and(status.eq.DRAFT,UserId.eq.${user.id})`
      );
    } else {
      query.eq("status", "PUBLISHED");
    }
    const { data, status, statusText } = await query;
    if (status === 200) return data;
    else throw new Error();
  },
  async get(articleId) {
    const {
      data: { user },
    } = await client.auth.getUser();
    const query = client.from("Articles").select();
    if (user) {
      query.or(
        `status.eq.PUBLISHED, and(status.eq.DRAFT,UserId.eq.${user.id})`
      );
    } else {
      query.eq("status", "PUBLISHED");
    }

    return (await query.eq("id", articleId).single()).data;
  },
  async update(articleId, inputData) {
    const { data } = await client
      .from("Articles")
      .update(inputData)
      .eq("id", articleId)
      .select()
      .single();
    return data;
  },
  async uploadImage(articleId, file) {
    const { data, error } = await client.storage
      .from("article-images")
      .upload(`public/images/${articleId}.png`, file, {
        cacheControl: "3600",
        upsert: true,
      });
  },
  async getPublicUrl(articleId) {
    const { data } = await client.storage
      .from("article-images")
      .list("public/images/", {
        limit: 1,
        search: `${articleId}.png`,
      });
    if (data.length) {
      return client.storage
        .from("article-images")
        .getPublicUrl(`public/images/${articleId}.png`).data.publicUrl;
    }
  },
};
