import client from '../../client';

export default {
  Query: {
    searchUsers: async (_, { keyword, lastId }) => {
      try {
        const PAGE_SIZE = !lastId ? 4 : 8;
        const users = await client.user.findMany({
          where: { username: { startsWith: keyword.toLowerCase() } },
          select: { id: true, username: true, avatar: true },
          skip: lastId ? 1 : 0,
          take: PAGE_SIZE,
          ...(lastId && { cursor: { id: lastId } }),
        });
        let lastUserId = null;
        if (users.length) {
          lastUserId = users[users.length - 1].id;
        }
        return { ok: true, users, lastId: lastUserId };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
