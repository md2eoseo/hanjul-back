import client from '../../client';

const resolverFn = async (_, { lastId }) => {
  try {
    const PAGE_SIZE = 20;
    const dateTime = new Date();
    console.log(typeof dateTime.getFullYear());
    const formatDateTime =
      dateTime.getFullYear().toString().slice(2) +
      (dateTime.getMonth() + 1).toString().padStart(2, '0') +
      dateTime.getDate().toString().padStart(2, '0');
    const { id: wordId } = await client.word.findFirst({ where: { date: formatDateTime } });
    const posts = await client.post.findMany({
      where: { wordId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    });
    return { ok: true, posts };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Query: {
    seeDayFeed: resolverFn,
  },
};
