import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

const resolverFn = async (_, { postId }, { loggedInUser }) => {
  try {
    const post = await client.post.findUnique({ where: { id: postId } });
    if (!post) {
      return { ok: false, error: 'Post not found!' };
    }
    const likeExists = await client.like.findUnique({
      where: { postId_userId: { postId, userId: loggedInUser.id } },
    });
    if (likeExists) {
      await client.like.delete({ where: { id: likeExists.id } });
      return { ok: true, like: false };
    } else {
      await client.like.create({ data: { postId, userId: loggedInUser.id } });
      return { ok: true, like: true };
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
