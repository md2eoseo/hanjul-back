import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

const resolverFn = async (_, { lastId, pageSize }, { loggedInUser }) => {
  try {
    const posts = await client.post.findMany({
      where: { OR: [{ author: { followers: { some: { id: loggedInUser.id } } } }, { likes: { some: { userId: loggedInUser.id } } }] },
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
    seeArchive: protectedResolver(resolverFn),
  },
};
