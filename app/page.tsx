"use client";

import { useState } from "react";
import { format } from "date-fns";
import { AnimatePresence } from "framer-motion";
import { useCalendar } from "@/hooks/useCalendar";
import { useTodos } from "@/hooks/useTodos";
import CalendarBoard from "@/components/CalendarBoard";
import TodoPanel from "@/components/TodoPanel";
import { LanguageProvider, useTranslation } from "@/contexts/LanguageContext";

function JournalApp() {
	const { currentDate, selectedDate, calendarDays, nextMonth, prevMonth, selectDate } = useCalendar();

	const { todos, addTodo, toggleTodo, deleteTodo, getTodosByDate, isLoaded } = useTodos();
	const { t, language, setLanguage } = useTranslation();

	const [direction, setDirection] = useState(0);
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	const handleNext = () => {
		setDirection(1);
		nextMonth();
	};

	const handlePrev = () => {
		setDirection(-1);
		prevMonth();
	};

	const handleDateClick = (date: Date) => {
		selectDate(date);
		setIsPanelOpen(true);
	};

	if (!isLoaded) return null;

	const selectedDateTodos = getTodosByDate(format(selectedDate, "yyyy-MM-dd"));

	return (
		<main className="min-h-screen pt-12 pb-12 px-4 flex flex-col overflow-hidden">
			<header className="max-w-4xl mx-auto w-full flex items-center justify-between mb-12 relative z-10">
				<div className="flex items-center gap-6">
					<button onClick={handlePrev} className="text-[#4F6D7A]/50 hover:text-[#4F6D7A] transition-colors p-2 text-xl font-serif">
						←
					</button>
					<h1 className="text-2xl md:text-3xl font-semibold text-[#1E1F24] tracking-tight">
						{format(currentDate, "yyyy")} · <span className="text-[#4F6D7A]">{format(currentDate, "MMMM")}</span>
					</h1>
					<button onClick={handleNext} className="text-[#4F6D7A]/50 hover:text-[#4F6D7A] transition-colors p-2 text-xl font-serif">
						→
					</button>
				</div>

				<button onClick={() => setLanguage(language === "en" ? "zh" : "en")} className="text-xs font-bold text-[#4F6D7A] border border-[#4F6D7A]/20 px-3 py-1 rounded-full uppercase tracking-wider hover:bg-[#4F6D7A] hover:text-white transition-all">
					{language === "en" ? "EN" : "中"}
				</button>
			</header>

			<section className="flex-1">
				<CalendarBoard currentDate={currentDate} selectedDate={selectedDate} calendarDays={calendarDays} todos={todos} onSelectDate={handleDateClick} direction={direction} />
			</section>

			<AnimatePresence>{isPanelOpen && <TodoPanel date={selectedDate} todos={selectedDateTodos} onAdd={addTodo} onToggle={toggleTodo} onDelete={deleteTodo} onClose={() => setIsPanelOpen(false)} />}</AnimatePresence>
		</main>
	);
}

export default function Home() {
	return (
		<LanguageProvider>
			<JournalApp />
		</LanguageProvider>
	);
}
