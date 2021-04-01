import client from '../../client';
import { protectedResolver } from '../users.utils';

const resolverFn = async (_, { username }, { loggedInUser }) => {
  try {
    const followedUser = await client.user.findUnique({ where: { username } });
    if (!followedUser) {
      return { ok: false, error: 'User not found!' };
    }
    await client.user.update({
      where: { id: loggedInUser.id },
      data: {
        following: { connect: [{ id: followedUser.id }] },
      },
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Mutation: { followUser: protectedResolver(resolverFn) },
};
