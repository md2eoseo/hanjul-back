import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

const resolverFn = async (_, { text, wordId }, { loggedInUser }) => {
  try {
    let isIncluded = false;
    const { word, root, variation } = await client.word.findUnique({
      where: { id: wordId },
    });

    const trimmedText = text.trim();
    if (!trimmedText) {
      return { ok: false, error: 'There is no text!' };
    }

    if (!root) {
      isIncluded = trimmedText.includes(word);
    } else {
      isIncluded = trimmedText.includes(root);
      // TODO: check variation if root is not enough.
    }
    if (!isIncluded) {
      return { ok: false, error: 'Word not included!' };
    }
    await client.post.create({
      data: { text: trimmedText, authorId: loggedInUser.id, wordId },
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Mutation: {
    createPost: protectedResolver(resolverFn),
  },
};
