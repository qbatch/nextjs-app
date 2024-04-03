import { NextRequest, NextResponse } from 'next/server';

import User from 'src/models/user';

import { DataBaseConnection } from 'src/config/database';
import GenerateAuthToken from 'src/utils/token-generation';
import SendEmail from 'src/utils/send-email';

DataBaseConnection();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const token = await GenerateAuthToken(user._id);

    await User.updateOne({
      email
    }, {
      $set: {
        token,
        isVisited: false
      }
    });

    SendEmail({
      email,
      unique: token,
      page: 'reset-password'
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
