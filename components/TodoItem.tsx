"use client";

import { useState, useRef, useEffect } from "react";
import { Todo } from "@/types";
import gsap from "gsap";

interface TodoItemProps {
	todo: Todo;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.text);
	const inputRef = useRef<HTMLInputElement>(null);
	const itemRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus();
		}
	}, [isEditing]);

	const handleEdit = () => {
		setIsEditing(true);
		setEditText(todo.text);
	};

	const handleSave = () => {
		if (editText.trim()) {
			onEdit(todo.id, editText.trim());
			setIsEditing(false);
		} else {
			setEditText(todo.text);
			setIsEditing(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSave();
		} else if (e.key === "Escape") {
			setEditText(todo.text);
			setIsEditing(false);
		}
	};

	const handleDelete = () => {
		gsap.to(itemRef.current, {
			x: 100,
			opacity: 0,
			duration: 0.5,
			ease: "power2.in",
			onComplete: () => onDelete(todo.id),
		});
	};

	return (
		<li ref={itemRef} className="group flex items-center gap-6 p-5 mb-4 cinematic-glass rounded-2xl transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]">
			<div className="relative flex items-center justify-center w-6 h-6">
				<input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} className="peer appearance-none w-6 h-6 border-2 border-white/20 rounded-lg checked:bg-purple-600 checked:border-purple-600 transition-all cursor-pointer hover:border-purple-400" />
				<svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-300" viewBox="0 0 14 14" fill="none">
					<path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>

			<div className="flex-1 min-w-0">
				{isEditing ? (
					<input ref={inputRef} type="text" value={editText} onChange={(e) => setEditText(e.target.value)} onBlur={handleSave} onKeyDown={handleKeyDown} className="w-full bg-white/5 text-white focus:outline-none border-b border-purple-500 rounded-lg px-3 py-2 text-lg" />
				) : (
					<span onDoubleClick={handleEdit} className={`block truncate cursor-pointer select-none transition-all duration-500 text-xl font-light tracking-wide ${todo.completed ? "text-gray-500 line-through decoration-purple-500/50" : "text-gray-200 group-hover:text-white"}`}>
						{todo.text}
					</span>
				)}
			</div>

			<div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
				{!isEditing && (
					<button onClick={handleEdit} className="p-3 bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 rounded-xl transition-all" aria-label="Edit">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
							<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
						</svg>
					</button>
				)}
				<button onClick={handleDelete} className="p-3 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-xl transition-all" aria-label="Delete">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<polyline points="3 6 5 6 21 6"></polyline>
						<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
						<line x1="10" y1="11" x2="10" y2="17"></line>
						<line x1="14" y1="11" x2="14" y2="17"></line>
					</svg>
				</button>
			</div>
		</li>
	);
}
