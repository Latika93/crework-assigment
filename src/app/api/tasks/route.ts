import { connect } from "@/dbconfig/dbconfig";
import Task from "@/models/taskModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("reached here");

        if (typeof decoded === 'object' && 'id' in decoded) {
            const userId = (decoded as { id: string }).id;

            const user = await User.findById(userId);
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            const task = await Task.create({ ...reqBody, user: user._id });
            console.log("task created here ", { ...reqBody, user: user._id });

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
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === 'object' && 'id' in decoded) {
            const userId = (decoded as { id: string }).id;

            const tasks = await Task.find({ user: userId });

            return NextResponse.json({
                message: 'Tasks fetched successfully',
                success: true,
                tasks,
            });
        } else {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }
    } catch (error: any) {
        console.error('Error during fetching tasks:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}