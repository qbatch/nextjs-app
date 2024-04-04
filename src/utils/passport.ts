import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import User, { IUser } from '@/models/user';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY as string
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user: IUser | null = await User.findOne({ _id: payload._id });
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const passportConfig = passport;
