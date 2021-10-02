import bcrypt from 'bcrypt';
import client from '../../client';

export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password, role }) => {
      try {
        // checks for username and email
        const usernameExist = await client.user.findFirst({ where: { username } });
        if (usernameExist) {
          return {
            ok: false,
            error: '이미 사용 중인 사용자명입니다.',
          };
        }
        const emailExist = await client.user.findFirst({ where: { email } });
        if (emailExist) {
          return {
            ok: false,
            error: '이미 사용 중인 이메일입니다.',
          };
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save and return the user
        await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            role,
          },
        });
        return { ok: true, username };
      } catch (error) {
        return { ok: true, error };
      }
    },
  },
};
