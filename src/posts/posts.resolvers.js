import client from '../client';

export default {
  Post: {
    isMine: ({ authorId }, _, { loggedInUser }) => authorId === loggedInUser?.id,
    likesCount: ({ id }) => client.like.count({ where: { postId: id } }),
    isLiked: async ({ id: postId }, _, { loggedInUser: { id: userId } }) =>
      Boolean(await client.like.findUnique({ where: { postId_userId: { postId, userId } } })),
  },
};
