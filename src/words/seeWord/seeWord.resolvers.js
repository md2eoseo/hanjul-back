import client from '../../client';

export default {
  Query: {
    seeWord: async (_, { id }) => {
      try {
        const word = await client.word.findUnique({ where: { id } });
        if (!word) {
          return { ok: false, error: 'Word not found!' };
        }
        return { ok: true, word };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
