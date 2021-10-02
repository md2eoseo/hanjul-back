import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../../client';

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        // find user with args.username
        const user = await client.user.findUnique({ where: { username } });
        if (!user) {
          return { ok: false, error: '존재하지 않는 사용자명입니다.' };
        }

        // check password
        const loginSuccess = await bcrypt.compare(password, user.password);
        if (!loginSuccess) {
          return { ok: false, error: '비밀번호가 일치하지 않습니다.' };
        }

        // issue valid token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
        return { ok: true, token };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};
