export interface Todo {
	id: string;
	text: string;
	completed: boolean;
	date: string; // ISO Date String (YYYY-MM-DD)
}

export type FilterType = "all" | "active" | "completed";
