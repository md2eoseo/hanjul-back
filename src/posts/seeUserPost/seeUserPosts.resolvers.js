import client from '../../client';

const resolverFn = async (_, { username, lastId, pageSize }) => {
  try {
    const posts = await client.post.findMany({
      where: { author: { username } },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      take: pageSize || 20,
      skip: lastId ? 1 : 0,
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
};

export default {
  Query: {
    seeUserPosts: resolverFn,
  },
};
