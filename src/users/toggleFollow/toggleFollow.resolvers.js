import client from '../../client';
import { protectedResolver } from '../users.utils';

const resolverFn = async (_, { username }, { loggedInUser }) => {
  try {
    const user = await client.user.findUnique({ where: { username }, include: { followers: true } });
    if (!user) {
      return { ok: false, error: 'User not found!' };
    }

    const isFollowing = user.followers.findIndex(follower => follower.id === loggedInUser.id) !== -1;
    if (isFollowing) {
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: { disconnect: [{ id: user.id }] },
        },
      });
      return { ok: true, follow: false };
    } else {
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: { connect: [{ id: user.id }] },
        },
      });
      return { ok: true, follow: true };
    }
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Mutation: { toggleFollow: protectedResolver(resolverFn) },
};
