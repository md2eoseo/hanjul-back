import client from '../../client';

const resolverFn = async (_, { lastId }) => {
  try {
    const PAGE_SIZE = 20;
    const dateTime = new Date();
    const formatDateTime =
      dateTime.getFullYear().toString().slice(2) +
      (dateTime.getMonth() + 1).toString().padStart(2, '0') +
      dateTime.getDate().toString().padStart(2, '0');
    const word = await client.word.findFirst({ where: { date: formatDateTime } });
    if (!word) {
      return { ok: false, error: 'There is no word for today.' };
    }
    const wordId = word.id;
    const posts = await client.post.findMany({
      where: { wordId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    });
    let lastPostId = null;
    if (posts.length) {
      lastPostId = posts[posts.length - 1].id;
    }
    return { ok: true, posts, lastId: lastPostId };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Query: {
    seeDayFeed: resolverFn,
  },
};
