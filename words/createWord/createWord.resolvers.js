import client from '../../client';

export default {
  Mutation: {
    createWord: async (_, { word, meaning, root, variation, date }) => {
      try {
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
