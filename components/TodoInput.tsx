"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";

interface TodoInputProps {
	onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
	const [text, setText] = useState("");
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

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e as unknown as FormEvent);
		}
	};

	return (
		<div ref={containerRef} className="mb-12 w-full max-w-lg mx-auto">
			<form onSubmit={handleSubmit} className="flex items-end gap-3">
				<div className="flex-1">
					<Textarea value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} placeholder="有什么计划？" variant="journal" />
				</div>
				<Button type="submit" disabled={!text.trim()} variant="primary" className="min-w-[100px]">
					添加
				</Button>
			</form>
		</div>
	);
}
