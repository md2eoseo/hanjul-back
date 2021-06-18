import client from '../../client';

export default {
  Query: {
    searchWords: async (_, { word, date, lastId, pageSize }) => {
      try {
        const words = await client.word.findMany({
          where: { word: { contains: word }, date },
          skip: lastId ? 1 : 0,
          take: pageSize || 8,
          ...(lastId && { cursor: { id: lastId } }),
        });
        return { ok: true, words };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
