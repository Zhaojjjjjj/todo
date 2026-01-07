import { NextResponse } from "next/server";

export async function GET() {
	try {
		const isChinese = Math.random() > 0.5;

		if (isChinese) {
			// Fetch from Hitokoto API (https://developer.hitokoto.cn/sentence/)
			const res = await fetch("https://v1.hitokoto.cn/?c=i&c=d&c=k", {
				cache: "no-store",
			});

			if (!res.ok) throw new Error("Failed to fetch Chinese quote");

			const data = await res.json();
			return NextResponse.json({
				content: data.hitokoto,
				author: data.from_who || data.from || "佚名",
			});
		} else {
			// Fetch from Quotable API
			const res = await fetch("https://api.quotable.io/random", {
				cache: "no-store",
			});

			if (!res.ok) throw new Error("Failed to fetch English quote");

			const data = await res.json();
			return NextResponse.json({
				content: data.content,
				author: data.author,
			});
		}
	} catch (error) {
		console.error("Daily quote fetch error:", error);
		// Fallback quote
		return NextResponse.json({
			content: "The journey of a thousand miles begins with a single step.",
			author: "Lao Tzu",
		});
	}
}
