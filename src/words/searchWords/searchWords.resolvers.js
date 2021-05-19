import client from '../../client';

export default {
  Query: {
    searchWords: async (_, { word, date, lastId }) => {
      try {
        const PAGE_SIZE = 8;
        const words = await client.word.findMany({
          where: { word: { contains: word }, date },
          skip: lastId ? 1 : 0,
          take: PAGE_SIZE,
          ...(lastId && { cursor: { id: lastId } }),
        });
        return { ok: true, words };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
