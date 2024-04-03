import { NextRequest, NextResponse } from 'next/server';

import User from 'src/models/user';

import AuthenticateAuthToken from 'src/utils/authenticate-jwt';
import { DataBaseConnection } from 'src/config/database';

DataBaseConnection();
AuthenticateAuthToken;

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const authorization = request.headers.get('authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Invalid or missing authorization header' },
        { status: 401 }
      );
    }

    const token = authorization.split(' ')[ 1 ];
    const {
      password
    } = reqBody;

    const user = await User.findOne({ token });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      ); 3;
    }

    if (user.isVisited === true) {
      return NextResponse.json(
        { error: 'Link Expired' },
        { status: 400 }
      );
    }

    user.password = password;
    user.isVisited = true;

    await user.save();

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
};
