"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Quote {
	content: string;
	author: string;
}

export default function DailyQuote() {
	const [quote, setQuote] = useState<Quote | null>(null);

	useEffect(() => {
		fetch("/api/daily-quote")
			.then((res) => res.json())
			.then((data) => setQuote(data))
			.catch((err) => console.error(err));
	}, []);

	if (!quote) return null;

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="max-w-2xl mx-auto text-center mt-12 mb-8 px-6">
			<figure>
				<blockquote className="font-serif text-lg md:text-xl text-[#4F6D7A] italic leading-relaxed">“{quote.content}”</blockquote>
				<figcaption className="mt-3 text-sm text-[#4F6D7A]/60 font-medium uppercase tracking-widest">— {quote.author || "Unknown"}</figcaption>
			</figure>
		</motion.div>
	);
}
