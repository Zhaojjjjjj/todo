import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
	const session = await getServerSession(authOptions);
	const { id } = await context.params;

	if (!session?.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { text, completed } = await req.json();
		const todo = await prisma.todo.update({
			where: {
				id: id,
				userId: (session.user as any).id,
			},
			data: {
				...(text !== undefined && { text }),
				...(completed !== undefined && { completed }),
			},
		});
		return NextResponse.json(todo);
	} catch (error) {
		return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
	}
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
	const session = await getServerSession(authOptions);
	const { id } = await context.params;

	if (!session?.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		await prisma.todo.delete({
			where: {
				id: id,
				userId: (session.user as any).id,
			},
		});
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
	}
}
