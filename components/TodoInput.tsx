"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { useTranslation } from "@/contexts/LanguageContext";
import gsap from "gsap";

interface TodoInputProps {
	onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
	const [text, setText] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const { t } = useTranslation();
	const inputRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		gsap.fromTo(inputRef.current, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out", delay: 0.2 });
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (text.trim()) {
			onAdd(text.trim());
			setText("");
			// Subtle pulse effect on add
			gsap.to(inputRef.current, { scale: 1.02, duration: 0.1, yoyo: true, repeat: 1 });
		}
	};

	return (
		<div ref={inputRef} className="mb-12">
			<form onSubmit={handleSubmit} className={`relative p-1 rounded-2xl transition-all duration-500 cinematic-glass ${isFocused ? "ring-2 ring-purple-500/50 shadow-[0_0_30px_rgba(139,92,246,0.3)]" : ""}`}>
				<div className="flex items-center px-6 py-4">
					<input type="text" value={text} onChange={(e) => setText(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder={t.inputPlaceholder} className="w-full bg-transparent text-xl text-white placeholder:text-gray-500 focus:outline-none font-light tracking-wide" autoComplete="off" />
					<button type="submit" disabled={!text.trim()} className={`ml-4 px-6 py-2 rounded-xl font-bold transition-all duration-500 ${text.trim() ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:bg-purple-500 hover:scale-110 active:scale-95" : "bg-white/5 text-gray-600 cursor-not-allowed opacity-30"}`}>
						{t.add}
					</button>
				</div>
				{/* Animated Glow Border */}
				<div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 -z-10 opacity-0 transition-opacity duration-500 ${isFocused ? "opacity-40" : "group-hover:opacity-20"}`} />
			</form>
		</div>
	);
}
