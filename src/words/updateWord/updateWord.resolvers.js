import client from '../../client';
import { protectedAdminResolver } from '../../users/users.utils';

const resolverFn = async (_, { id, meaning, root, variation, date }) => {
  try {
    const exist = await client.word.findUnique({ where: { id } });
    if (!exist) {
      return { ok: false, error: 'Word not found!' };
    }
    await client.word.update({ where: { id }, data: { meaning, root, variation, date } });
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Mutation: {
    updateWord: protectedAdminResolver(resolverFn),
  },
};
