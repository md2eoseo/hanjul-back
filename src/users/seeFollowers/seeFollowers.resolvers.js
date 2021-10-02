import client from '../../client';

export default {
  Query: {
    seeFollowers: async (_, { username, lastId, pageSize }) => {
      try {
        const user = await client.user.findUnique({
          where: { username },
        });
        if (!user) {
          return { ok: false, error: 'User not found!' };
        }

        const followers = await client.user
          .findUnique({ where: { username } })
          .followers({ skip: lastId ? 1 : 0, take: pageSize || 8, ...(lastId && { cursor: { id: lastId } }) });
        let lastUserId = null;
        if (followers.length) {
          lastUserId = followers[followers.length - 1].id;
        }
        return {
          ok: true,
          followers,
          lastId: lastUserId,
        };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
