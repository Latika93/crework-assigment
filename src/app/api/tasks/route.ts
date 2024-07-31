import { connect } from "@/dbconfig/dbconfig";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
connect()
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        // Extract the token from the cookies
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("reached here");

        // Ensure decoded contains the id property
        if (typeof decoded === 'object' && 'id' in decoded) {
            const userId = (decoded as { id: string }).id;

            // Add user ID to task
            const task = await Task.create({ ...reqBody, user: userId });
            // const task = await Task.create(reqBody);
            console.log("task created here ", { ...reqBody, user: userId });


            return NextResponse.json({
                message: 'Task created successfully',
                success: true,
                task,
            });
        } else {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }
    } catch (error: any) {
        console.error('Error during task creation:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const tasks = await Task.find({});

        return NextResponse.json({
            message: 'Tasks fetched successfully',
            success: true,
            tasks,
        });
    } catch (error: any) {
        console.error('Error during fetching tasks:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}