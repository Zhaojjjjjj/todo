import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const todos = await prisma.todo.findMany({
			where: { userId: (session.user as any).id },
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json(todos);
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
	}
}

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { text, date } = await req.json();
		const todo = await prisma.todo.create({
			data: {
				text,
				date,
				userId: (session.user as any).id,
			},
		});
		return NextResponse.json(todo);
	} catch (error) {
		return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
	}
}
