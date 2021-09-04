import client from '../../client';
import { protectedAdminResolver } from '../../users/users.utils';

const resolverFn = async (_, { id }) => {
  try {
    const word = await client.word.findUnique({ where: { id } });
    if (!word) {
      return { ok: false, error: 'Word not found!' };
    }
    await client.word.delete({ where: { id } });
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Mutation: {
    deleteWord: protectedAdminResolver(resolverFn),
  },
};
