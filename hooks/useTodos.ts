import { useState, useEffect, useCallback } from "react";
import { Todo, FilterType } from "@/types";

export const useTodos = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [filter, setFilter] = useState<FilterType>("all");
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchTodos = useCallback(async () => {
		try {
			const res = await fetch("/api/todos");
			if (!res.ok) throw new Error("Failed to fetch todos");
			const data = await res.json();
			setTodos(data);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsLoaded(true);
		}
	}, []);

	useEffect(() => {
		fetchTodos();
		const savedFilter = localStorage.getItem("filter");
		if (savedFilter) setFilter(savedFilter as FilterType);
	}, [fetchTodos]);

	useEffect(() => {
		localStorage.setItem("filter", filter);
	}, [filter]);

	const addTodo = async (text: string, date: string) => {
		try {
			const res = await fetch("/api/todos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text, date }),
			});
			if (!res.ok) throw new Error("Failed to add todo");
			const newTodo = await res.json();
			setTodos((prev) => [newTodo, ...prev]);
		} catch (err: any) {
			setError(err.message);
		}
	};

	const toggleTodo = async (id: string) => {
		const todo = todos.find((t) => t.id === id);
		if (!todo) return;

		try {
			const res = await fetch(`/api/todos/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ completed: !todo.completed }),
			});
			if (!res.ok) throw new Error("Failed to toggle todo");
			setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
		} catch (err: any) {
			setError(err.message);
		}
	};

	const deleteTodo = async (id: string) => {
		try {
			const res = await fetch(`/api/todos/${id}`, {
				method: "DELETE",
			});
			if (!res.ok) throw new Error("Failed to delete todo");
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		} catch (err: any) {
			setError(err.message);
		}
	};

	const editTodo = async (id: string, text: string) => {
		try {
			const res = await fetch(`/api/todos/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text }),
			});
			if (!res.ok) throw new Error("Failed to update todo");
			setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
		} catch (err: any) {
			setError(err.message);
		}
	};

	const clearCompleted = () => {
		// This can be implemented as a bulk delete in the future if needed
		setTodos((prev) => prev.filter((todo) => !todo.completed));
	};

	const getTodosByDate = (dateStr: string) => {
		return todos.filter((todo) => todo.date === dateStr);
	};

	return {
		todos,
		filter,
		setFilter,
		addTodo,
		toggleTodo,
		deleteTodo,
		editTodo,
		clearCompleted,
		getTodosByDate,
		isLoaded,
		error,
	};
};
