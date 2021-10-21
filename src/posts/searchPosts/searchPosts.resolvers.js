import client from '../../client';

export default {
  Query: {
    searchPosts: async (_, { keyword, lastId, pageSize }) => {
      try {
        const posts = await client.post.findMany({
          where: { text: { contains: keyword } },
          select: { id: true, text: true, author: true },
          skip: lastId ? 1 : 0,
          take: pageSize || 8,
          ...(lastId && { cursor: { id: lastId } }),
        });
        let lastPostId = null;
        if (posts.length) {
          lastPostId = posts[posts.length - 1].id;
        }
        return { ok: true, posts, lastId: lastPostId };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
