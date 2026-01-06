import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Todo } from "@/types";
import { useTranslation } from "@/contexts/LanguageContext";
import Input from "./ui/Input";

interface TodoPanelProps {
	date: Date;
	todos: Todo[];
	onAdd: (text: string, date: string) => void;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onEdit: (id: string, text: string) => void;
	onClose: () => void;
}

export default function TodoPanel({ date, todos, onAdd, onToggle, onDelete, onEdit, onClose }: TodoPanelProps) {
	const [text, setText] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editText, setEditText] = useState("");

	const { t } = useTranslation();
	const formattedDate = format(date, "yyyy-MM-dd");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (text.trim()) {
			onAdd(text.trim(), formattedDate);
			setText("");
		}
	};

	const startEditing = (todo: Todo) => {
		setEditingId(todo.id);
		setEditText(todo.text);
	};

	const saveEdit = (id: string) => {
		if (editText.trim()) {
			onEdit(id, editText.trim());
		}
		setEditingId(null);
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditText("");
	};

	return (
		<>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40" />
			<motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#F6F5F3] paper-texture shadow-2xl z-50 p-8 border-l border-white/50 flex flex-col">
				<div className="flex justify-between items-end mb-8 border-b border-[#4F6D7A]/10 pb-4">
					<div>
						<h2 className="text-3xl font-serif font-bold text-[#1E1F24]">{format(date, "MMMM d")}</h2>
						<p className="text-[#4F6D7A] text-sm font-medium mt-1">{format(date, "EEEE")}</p>
					</div>
					<button onClick={onClose} className="p-2 hover:bg-[#4F6D7A]/10 rounded-full transition-colors text-[#4F6D7A]">
						<span className="sr-only">Close</span>✕
					</button>
				</div>

				<div className="flex-1 overflow-y-auto mb-6 pr-2">
					{todos.length === 0 ? (
						<div className="h-full flex flex-col items-center justify-center text-[#4F6D7A]/40">
							<p className="font-serif italic text-lg">No entries yet...</p>
						</div>
					) : (
						<ul className="space-y-3">
							{todos.map((todo) => (
								<motion.li key={todo.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="group flex items-start gap-4 p-4 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#4F6D7A]/10">
									<input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} className="mt-1.5 w-4 h-4 text-[#84A98C] border-[#4F6D7A]/30 rounded focus:ring-[#84A98C] cursor-pointer" />

									<div className="flex-1">
										{editingId === todo.id ? (
											<input
												type="text"
												value={editText}
												onChange={(e) => setEditText(e.target.value)}
												onBlur={() => saveEdit(todo.id)}
												onKeyDown={(e) => {
													if (e.key === "Enter") saveEdit(todo.id);
													if (e.key === "Escape") cancelEdit();
												}}
												className="w-full bg-transparent border-b border-[#4F6D7A] focus:outline-none text-base leading-relaxed text-[#1E1F24]"
												autoFocus
											/>
										) : (
											<span onClick={() => !todo.completed && startEditing(todo)} className={`block text-base leading-relaxed cursor-pointer ${todo.completed ? "text-[#4F6D7A]/50 line-through" : "text-[#1E1F24] hover:text-[#4F6D7A]"}`} title="Click to edit">
												{todo.text}
											</span>
										)}
									</div>

									<div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
										{/* Edit Icon (only visible if not editing) */}
										{editingId !== todo.id && !todo.completed && (
											<button onClick={() => startEditing(todo)} className="text-[#4F6D7A] hover:text-[#3d5a66] p-1 mr-1">
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
													<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
												</svg>
											</button>
										)}
										<button onClick={() => onDelete(todo.id)} className="text-[#c97c5d] hover:text-[#c97c5d]/80 p-1">
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<path d="M18 6L6 18M6 6l12 12" />
											</svg>
										</button>
									</div>
								</motion.li>
							))}
						</ul>
					)}
				</div>

				<form onSubmit={handleSubmit} className="mt-auto relative">
					<Input value={text} onChange={(e) => setText(e.target.value)} placeholder={t.inputPlaceholder} variant="bordered" className="bg-white/80" autoFocus />
					<button type="submit" className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${text.trim() ? "text-[#4F6D7A] hover:bg-[#4F6D7A]/10" : "text-gray-300 cursor-default"}`} disabled={!text.trim()}>
						→
					</button>
				</form>
			</motion.div>
		</>
	);
}
