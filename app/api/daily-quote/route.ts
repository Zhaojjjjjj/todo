import { NextResponse } from "next/server";

export async function GET() {
	try {
		// Fetch from Hitokoto API (https://developer.hitokoto.cn/sentence/)
		// c=i (Literature), c=d (Literature), c=k (Philosophy)
		const res = await fetch("https://v1.hitokoto.cn/?c=i&c=d&c=k", {
			next: { revalidate: 3600 * 24 }, // Cache for 24 hours
		});

		if (!res.ok) {
			throw new Error("Failed to fetch quote");
		}

		const data = await res.json();

		return NextResponse.json({
			content: data.hitokoto,
			author: data.from_who || data.from,
		});
	} catch (error) {
		console.error("Daily quote fetch error:", error);
		// Fallback quote
		return NextResponse.json({
			content: "The journey of a thousand miles begins with a single step.",
			author: "Lao Tzu",
		});
	}
}
