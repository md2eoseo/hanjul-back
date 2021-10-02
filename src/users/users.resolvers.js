import client from '../client';

export default {
  User: {
    totalPosts: ({ id }) =>
      client.post.count({
        where: { authorId: id },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: { following: { some: { id } } },
      }),
    totalFollowing: ({ id }) =>
      client.user.count({
        where: { followers: { some: { id } } },
      }),
    isMe: ({ id }, _, { loggedInUser }) => (!loggedInUser || id !== loggedInUser.id ? false : true),
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: { id: loggedInUser.id, following: { some: { id } } },
      });
      return Boolean(exists);
    },
    isFollowers: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: { id: loggedInUser.id, followers: { some: { id } } },
      });
      return Boolean(exists);
    },
  },
};
