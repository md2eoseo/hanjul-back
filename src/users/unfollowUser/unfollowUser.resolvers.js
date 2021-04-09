import client from '../../client';
import { protectedResolver } from '../users.utils';

const resolverFn = async (_, { username }, { loggedInUser }) => {
  try {
    const unfollowedUser = await client.user.findUnique({
      where: { username },
    });
    if (!unfollowedUser) {
      return { ok: false, error: 'User not found!' };
    }
    await client.user.update({
      where: { id: loggedInUser.id },
      data: {
        following: { disconnect: [{ id: unfollowedUser.id }] },
      },
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Mutation: { unfollowUser: protectedResolver(resolverFn) },
};
