import { connect } from "@/dbconfig/dbconfig";
import Task from "@/models/taskModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

const JWT_SECRET = process.env.JWT_SECRET!;

export async function DELETE(request: NextRequest, { params }: any) {
    try {
        const { id } = params;
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === 'object' && 'id' in decoded) {
            const userId = (decoded as { id: string }).id;

            const task = await Task.findOneAndDelete({ _id: id, user: userId });

            if (!task) {
                return NextResponse.json({ error: 'Task not found or unauthorized' }, { status: 404 });
            }

            return NextResponse.json({
                message: 'Task deleted successfully',
                success: true,
            });
        } else {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }
    } catch (error: any) {
        console.error('Error during deleting task:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: any) {
    try {
        console.log(params);
        const { id } = params;
        const updatedData = await request.json();
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === 'object' && 'id' in decoded) {
            const userId = (decoded as { id: string }).id;

            const task = await Task.findOneAndUpdate({ _id: id, user: userId }, updatedData, { new: true });

            if (!task) {
                return NextResponse.json({ error: 'Task not found or unauthorized' }, { status: 404 });
            }

            return NextResponse.json({
                message: 'Task updated successfully',
                success: true,
                task,
            });
        } else {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }
    } catch (error: any) {
        console.error('Error during updating task:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

