import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import {DataBaseConnection} from "@/config/database";
import GenerateAuthToken from "@/utils/token-generation";
import User from '@/models/user';

DataBaseConnection();

export const POST = async(request: NextRequest) => {
    try {

        const reqBody = await request.json()
        const {
            email, 
            password
        } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");
        
        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        
        const token = await GenerateAuthToken(user._id);

        return NextResponse.json({
            message: "Login successful",
            success: true,
            name: user.username,
            token,
            userEmail: user.email
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
};
