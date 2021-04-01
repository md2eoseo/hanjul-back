import client from '../../client';

export default {
  Query: {
    seeFollowers: async (_, { username, lastId }) => {
      try {
        const PAGE_SIZE = 5;
        const ok = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!ok) {
          return { ok: false, error: 'User not found!' };
        }

        const followers = await client.user
          .findUnique({ where: { username } })
          .followers({ skip: lastId ? 1 : 0, take: PAGE_SIZE, ...(lastId && { cursor: { id: lastId } }) });
        return {
          ok: true,
          followers,
        };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
