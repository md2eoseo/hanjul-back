import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

const resolverFn = async (_, { postId }, { loggedInUser }) => {
  try {
    const post = await client.post.findUnique({ where: { id: postId } });
    if (!post) {
      return { ok: false, error: 'Post not found!' };
    }
    const like = await client.like.findUnique({
      where: { postId_userId: { postId, userId: loggedInUser.id } },
    });
    if (!like) {
      await client.like.create({ data: { postId, userId: loggedInUser.id } });
      return { ok: true, like: true };
    } else {
      await client.like.delete({ where: { id: like.id } });
      return { ok: true, like: false };
    }
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
};

export default {
  Mutation: {
    toggleLike: protectedResolver(resolverFn),
  },
};
