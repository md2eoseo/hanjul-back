import client from '../../client';

export default {
  Query: {
    seeFollowing: async (_, { username, lastId, pageSize }) => {
      try {
        const user = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!user) {
          return { ok: false, error: 'User not found!' };
        }

        const following = await client.user.findUnique({ where: { username } }).following({
          skip: lastId ? 1 : 0,
          take: pageSize || 8,
          ...(lastId && { cursor: { id: lastId } }),
        });
        let lastUserId = null;
        if (following.length) {
          lastUserId = following[following.length - 1].id;
        }
        return {
          ok: true,
          following,
          lastId: lastUserId,
        };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
