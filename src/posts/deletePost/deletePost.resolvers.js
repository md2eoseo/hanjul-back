import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

const resolverFn = async (_, { id }, { loggedInUser }) => {
  try {
    const post = await client.post.findUnique({ where: { id } });
    if (!post) {
      return { ok: false, error: 'Post not found!' };
    }
    if (post.authorId !== loggedInUser.id) {
      return { ok: false, error: 'You cannot delete others post!' };
    }
    await client.like.deleteMany({ where: { postId: id } });
    await client.post.delete({ where: { id } });
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Mutation: {
    deletePost: protectedResolver(resolverFn),
  },
};
