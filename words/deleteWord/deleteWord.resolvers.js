import client from '../../client';

export default {
  Mutation: {
    deleteWord: async (_, { id }) => {
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
    },
  },
};
