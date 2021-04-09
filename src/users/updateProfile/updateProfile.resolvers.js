import bcrypt from 'bcrypt';
import client from '../../client';
import { protectedResolver } from '../users.utils';
import { uploadToS3 } from '../../shared/shared.utils';

const resolverFn = async (_, { firstName, lastName, username, email, password: newPassword, bio, avatar }, { loggedInUser }) => {
  try {
    // if there is new avatar
    let avatarUrl;
    if (avatar) {
      avatarUrl = await uploadToS3(avatar, loggedInUser.id, 'avatar');
    }

    // if there is new password
    let hashedPassword;
    if (newPassword) {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    const updateSuccess = await client.user.update({
      where: { id: loggedInUser.id },
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        bio,
        avatar: avatarUrl,
      },
    });
    if (!updateSuccess) {
      return { ok: false, error: 'Failed updating profile!' };
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
