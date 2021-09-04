import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

const resolverFn = async (_, { id }) => {
  try {
    const post = await client.post.findUnique({
      where: { id },
      include: { author: true, word: true },
    });
    if (!post) {
      return { ok: false, error: 'Post not found!' };
    }
    return { ok: true, post };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
};

export default {
  Query: {
    seePost: protectedResolver(resolverFn),
  },
};
