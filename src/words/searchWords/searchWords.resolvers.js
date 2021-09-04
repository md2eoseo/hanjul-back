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
        let lastWordId = null;
        if (words.length) {
          lastWordId = words[words.length - 1].id;
        }
        return { ok: true, words, lastId: lastWordId };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
