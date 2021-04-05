import client from '../../client';

const resolverFn = async (_, { postId }) => {
  try {
    const likes = await client.like.findMany({
      where: { postId },
      select: { user: true },
    });
    const users = likes.map(like => like.user);
    return { ok: true, users };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Query: {
    seeLikes: resolverFn,
  },
};
