import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

const resolverFn = async (_, { date, lastId, pageSize }) => {
  try {
    // const dateTime = new Date(Date.now() + 9 * 60 * 60 * 1000);
    // const formatDateTime =
    //   dateTime.getFullYear().toString().slice(2) +
    //   (dateTime.getMonth() + 1).toString().padStart(2, '0') +
    //   dateTime.getDate().toString().padStart(2, '0');
    // console.log(dateTime, formatDateTime);
    const word = await client.word.findFirst({ where: { date } });
    if (!word) {
      return { ok: false, error: '해당되는 날짜에 단어가 없습니다.' };
    }
    const wordId = word.id;
    const posts = await client.post.findMany({
      where: { wordId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      take: pageSize || 20,
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
    seeDayFeed: protectedResolver(resolverFn),
  },
};
