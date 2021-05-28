import client from '../../client';
import { protectedResolver } from '../users.utils';

const resolverFn = async (_, __, { loggedInUser }) => {
  try {
    const user = await client.user.findUnique({ where: { id: loggedInUser.id } });
    if (!user) {
      return { ok: false, error: 'User not found!' };
    }
    return { ok: true, user };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Query: {
    seeMyProfile: protectedResolver(resolverFn),
  },
};
