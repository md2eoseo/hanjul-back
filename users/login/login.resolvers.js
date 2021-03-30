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
          return { ok: false, error: 'Username not found!' };
        }

        // check password
        const loginSuccess = await bcrypt.compare(password, user.password);
        if (!loginSuccess) {
          return { ok: false, error: 'Wrong password!' };
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
