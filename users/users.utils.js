import jwt from 'jsonwebtoken';
import client from '../client';

export const getLoggedInUser = async token => {
  try {
    if (!token) {
      return null;
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
};

export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      return { ok: false, error: 'Please login to perform this action.' };
    }
    return ourResolver(root, args, context, info);
  };
}
