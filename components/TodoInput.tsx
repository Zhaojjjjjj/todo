"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { useTranslation } from "@/contexts/LanguageContext";
import gsap from "gsap";
import Input from "./ui/Input";
import Button from "./ui/Button";

interface TodoInputProps {
	onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
	const [text, setText] = useState("");
	const { t } = useTranslation();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		gsap.fromTo(containerRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 });
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (text.trim()) {
			onAdd(text.trim());
			setText("");
		}
	};

	return (
		<div ref={containerRef} className="mb-12 w-full max-w-lg mx-auto">
			<form onSubmit={handleSubmit} className="flex items-end gap-3">
				<div className="flex-1">
					<Input value={text} onChange={(e) => setText(e.target.value)} placeholder={t.inputPlaceholder} variant="journal" />
				</div>
				<Button type="submit" disabled={!text.trim()} variant="primary" className="min-w-[100px]">
					{t.add}
				</Button>
			</form>
		</div>
	);
}
