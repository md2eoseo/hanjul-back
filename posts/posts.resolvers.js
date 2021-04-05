export default {
  Post: {
    isMine: ({ authorId }, _, { loggedInUser }) => authorId === loggedInUser?.id,
  },
};
