import client from '../../client';

export default {
  Query: {
    seeFollowing: async (_, { username, lastId, pageSize }) => {
      try {
        const ok = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!ok) {
          return { ok: false, error: 'User not found!' };
        }

        const following = await client.user.findUnique({ where: { username } }).following({
          skip: lastId ? 1 : 0,
          take: pageSize || 8,
          ...(lastId && { cursor: { id: lastId } }),
        });
        return {
          ok: true,
          following,
        };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
