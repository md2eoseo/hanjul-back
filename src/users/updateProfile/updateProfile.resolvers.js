import client from '../../client';
import { protectedResolver } from '../users.utils';
import { uploadToS3 } from '../../shared/shared.utils';

const resolverFn = async (_, { firstName, lastName, username, bio, avatar }, { loggedInUser }) => {
  try {
    // if there is new avatar
    let avatarUrl;
    if (avatar) {
      avatarUrl = await uploadToS3(avatar, loggedInUser.id, 'avatar');
    }

    const updateSuccess = await client.user.update({
      where: { id: loggedInUser.id },
      data: {
        firstName,
        lastName,
        username,
        bio,
        avatar: avatarUrl,
      },
    });
    if (!updateSuccess) {
      return { ok: false, error: '계정 정보 변경에 실패했습니다.' };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Mutation: {
    updateProfile: protectedResolver(resolverFn),
  },
};
