import client from '../client';

export default {
  Post: {
    isMine: ({ authorId }, _, { loggedInUser }) => authorId === loggedInUser?.id,
    likesCount: ({ postId }) => client.like.count({ where: { postId } }),
  },
};
