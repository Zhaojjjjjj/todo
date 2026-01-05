import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Todo } from "@/types";
import { useTranslation } from "@/contexts/LanguageContext";

interface TodoPanelProps {
	date: Date;
	todos: Todo[];
	onAdd: (text: string, date: string) => void;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onClose: () => void;
}

export default function TodoPanel({ date, todos, onAdd, onToggle, onDelete, onClose }: TodoPanelProps) {
	const [text, setText] = useState("");
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);
	const formattedDate = format(date, "yyyy-MM-dd");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (text.trim()) {
			onAdd(text.trim(), formattedDate);
			setText("");
		}
	};

	return (
		<>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40" />
			<motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#F6F5F3] paper-texture shadow-2xl z-50 p-8 border-l border-white/50 flex flex-col">
				<div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
					<div>
						<h2 className="text-3xl font-semibold text-[#1E1F24]">{format(date, "MMMM d")}</h2>
						<p className="text-[#4F6D7A] text-sm font-medium mt-1">{format(date, "EEEE")}</p>
					</div>
					<button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
						<span className="sr-only">Close</span>✕
					</button>
				</div>

				<div className="flex-1 overflow-y-auto mb-6 pr-2">
					{todos.length === 0 ? (
						<div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
							<p className="font-serif italic text-lg">Empty page...</p>
						</div>
					) : (
						<ul className="space-y-3">
							{todos.map((todo) => (
								<motion.li key={todo.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="group flex items-start gap-4 p-4 bg-white rounded-lg shadow-paper hover:shadow-md transition-all border border-transparent hover:border-gray-100">
									<input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} className="mt-1 w-5 h-5 text-[#84A98C] border-gray-300 rounded focus:ring-[#84A98C]" />
									<div className="flex-1">
										<span className={`block text-base ${todo.completed ? "text-gray-400 line-through" : "text-gray-800"}`}>{todo.text}</span>
									</div>
									<button onClick={() => onDelete(todo.id)} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-colors">
										<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M18 6L6 18M6 6l12 12" />
										</svg>
									</button>
								</motion.li>
							))}
						</ul>
					)}
				</div>

				<form onSubmit={handleSubmit} className="mt-auto relative group">
					<input ref={inputRef} type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={t.inputPlaceholder} className="w-full bg-white p-4 pr-12 rounded-xl shadow-paper border-none outline-none focus:ring-2 focus:ring-[#4F6D7A]/50 transition-all text-gray-700 placeholder:text-gray-400" autoFocus />
					<button type="submit" className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${text.trim() ? "bg-[#4F6D7A] text-white" : "text-gray-300"}`} disabled={!text.trim()}>
						→
					</button>
				</form>
			</motion.div>
		</>
	);
}
