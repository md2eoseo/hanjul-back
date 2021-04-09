import { Role } from '@prisma/client';
import client from '../../client';

export default {
  Mutation: {
    createWord: async (_, { word, meaning, root, variation, date }, { loggedInUser }) => {
      try {
        if (loggedInUser.role !== Role.ADMIN) {
          return { ok: false, error: 'Only administrator can create words.' };
        }
        await client.word.create({
          data: { word, meaning, root, variation, date },
        });
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
