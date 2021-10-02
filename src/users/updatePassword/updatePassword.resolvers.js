import bcrypt from 'bcrypt';
import client from '../../client';
import { protectedResolver } from '../users.utils';

const resolverFn = async (_, { oldPassword, newPassword }, { loggedInUser }) => {
  try {
    const user = await client.user.findUnique({ where: { id: loggedInUser.id } });
    const oldPasswordFromDB = user.password;
    const isOldPasswordEqual = await bcrypt.compare(oldPassword, oldPasswordFromDB);
    if (!isOldPasswordEqual) return { ok: false, error: '기존 비밀번호가 일치하지 않습니다.' };

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updateSuccess = await client.user.update({
      where: { id: loggedInUser.id },
      data: { password: hashedNewPassword },
    });
    if (!updateSuccess) {
      return { ok: false, error: '비밀번호 변경에 실패했습니다.' };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  Mutation: {
    updatePassword: protectedResolver(resolverFn),
  },
};
