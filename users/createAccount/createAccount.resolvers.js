import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        // checks for username and email
        const exist = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });
        if (exist) {
          return {
            ok: false,
            error: "This username/email is already taken.",
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
          },
        });
        return { ok: true, username };
      } catch (error) {
        return { ok: true, error };
      }
    },
  },
};
