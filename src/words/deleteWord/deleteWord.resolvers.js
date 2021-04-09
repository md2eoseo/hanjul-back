import { Role } from '@prisma/client';
import client from '../../client';

export default {
  Mutation: {
    deleteWord: async (_, { id }, { loggedInUser }) => {
      try {
        if (loggedInUser.role !== Role.ADMIN) {
          return { ok: false, error: 'Only administrator can delete words.' };
        }
        const word = await client.word.findUnique({ where: { id } });
        if (!word) {
          return { ok: false, error: 'Word not found!' };
        }
        await client.word.delete({ where: { id } });
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
