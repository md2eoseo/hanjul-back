import client from '../../client';
import { protectedAdminResolver } from '../../users/users.utils';

const resolverFn = async (_, { word, meaning, root, variation, date }) => {
  try {
    await client.word.create({
      data: { word, meaning, root, variation, date },
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Mutation: {
    createWord: protectedAdminResolver(resolverFn),
  },
};
