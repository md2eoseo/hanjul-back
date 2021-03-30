import client from '../../client';

export default {
  Query: {
    seeProfile: async (_, { username }) => {
      try {
        const user = await client.user.findUnique({ where: { username } });
        if (!user) {
          return { ok: false, error: 'User not found!' };
        }
        return { ok: true, user };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
