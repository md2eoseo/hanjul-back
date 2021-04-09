import { Role } from '@prisma/client';
import client from '../../client';

export default {
  Mutation: {
    updateWord: async (_, { id, meaning, root, variation, date }, { loggedInUser }) => {
      try {
        if (loggedInUser.role !== Role.ADMIN) {
          return { ok: false, error: 'Only administrator can update words.' };
        }
        const exist = await client.word.findUnique({ where: { id } });
        if (!exist) {
          return { ok: false, error: 'Word not found!' };
        }
        await client.word.update({ where: { id }, data: { meaning, root, variation, date } });
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
