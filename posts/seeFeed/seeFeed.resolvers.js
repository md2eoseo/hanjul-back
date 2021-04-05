import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

const resolverFn = async (_, { lastId }, { loggedInUser }) => {
  try {
    const PAGE_SIZE = 20;
    const posts = await client.post.findMany({
      where: { author: { followers: { some: { id: loggedInUser.id } } } },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    });
    return { ok: true, posts };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Query: {
    seeFeed: protectedResolver(resolverFn),
  },
};
