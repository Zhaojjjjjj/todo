"use client";

import { useEffect, useRef } from "react";
import { Todo } from "@/types";
import TodoItem from "./TodoItem";
import gsap from "gsap";

interface TodoListProps {
	todos: Todo[];
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onEdit: (id: string, text: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
	const listRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (todos.length > 0 && listRef.current) {
			gsap.fromTo(
				listRef.current.children,
				{ opacity: 0, x: -20, filter: "blur(10px)" },
				{
					opacity: 1,
					x: 0,
					filter: "blur(0px)",
					duration: 0.8,
					stagger: 0.1,
					ease: "power3.out",
					clearProps: "all",
				}
			);
		}
	}, [todos.length]);

	if (todos.length === 0) {
		return (
			<div className="text-center py-20 cinematic-glass rounded-[2.5rem] animate-pulse">
				<p className="text-gray-400 text-2xl font-thin tracking-[0.2em] uppercase">暂无任务</p>
				<p className="text-purple-500/50 text-sm mt-4 tracking-widest uppercase">从添加一个任务开始吧</p>
			</div>
		);
	}

	return (
		<ul ref={listRef} className="space-y-4">
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
			))}
		</ul>
	);
}
