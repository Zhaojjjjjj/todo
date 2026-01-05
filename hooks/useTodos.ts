import { useState, useEffect } from "react";
import { Todo, FilterType } from "@/types";

export const useTodos = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [filter, setFilter] = useState<FilterType>("all");
	const [isLoaded, setIsLoaded] = useState(false);

	// Load from LocalStorage
	useEffect(() => {
		const savedTodos = localStorage.getItem("todos");
		const savedFilter = localStorage.getItem("filter");
		const savedLanguage = localStorage.getItem("language"); // Keep language persistence check if needed for other hooks

		if (savedTodos) {
			try {
				setTodos(JSON.parse(savedTodos));
			} catch (e) {
				console.error("Failed to parse todos:", e);
			}
		}

		if (savedFilter) {
			setFilter(savedFilter as FilterType);
		}

		setIsLoaded(true);
	}, []);

	// Save to LocalStorage
	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem("todos", JSON.stringify(todos));
			localStorage.setItem("filter", filter);
		}
	}, [todos, filter, isLoaded]);

	const addTodo = (text: string, date: string) => {
		const newTodo: Todo = {
			id: crypto.randomUUID(),
			text,
			completed: false,
			date,
		};
		setTodos((prev) => [newTodo, ...prev]);
	};

	const toggleTodo = (id: string) => {
		setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
	};

	const deleteTodo = (id: string) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	const editTodo = (id: string, text: string) => {
		setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
	};

	const clearCompleted = () => {
		setTodos((prev) => prev.filter((todo) => !todo.completed));
	};

	// Helper to get todos for a specific date
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
	};
};
