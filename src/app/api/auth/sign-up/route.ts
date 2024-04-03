import { NextRequest, NextResponse } from "next/server";
import { Types } from 'mongoose';

import User from 'src/models/user';

import { DataBaseConnection } from 'src/config/database';

DataBaseConnection();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const {
      username,
      email,
      password
    } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const newUser = new User({
      _id: new Types.ObjectId().toHexString(),
      username,
      email,
      password
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
