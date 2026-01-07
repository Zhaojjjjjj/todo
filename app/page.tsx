"use client";

import { useState } from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { AnimatePresence } from "framer-motion";
import { ViewMode, useCalendar } from "@/hooks/useCalendar";
import { useTodos } from "@/hooks/useTodos";
import CalendarBoard from "@/components/CalendarBoard";
import YearView from "@/components/YearView";
import TodoPanel from "@/components/TodoPanel";

import DailyQuote from "@/components/DailyQuote";

export default function Home() {
	const { currentDate, selectedDate, viewMode, calendarDays, yearMonths, nextMonth, prevMonth, nextYear, prevYear, selectDate, setMonth, setViewMode, goToToday } = useCalendar();

	const { todos, addTodo, toggleTodo, deleteTodo, editTodo, getTodosByDate, isLoaded } = useTodos();

	const [direction, setDirection] = useState(0);
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	const handleNext = () => {
		setDirection(1);
		if (viewMode === "month") {
			nextMonth();
		} else {
			nextYear();
		}
	};

	const handlePrev = () => {
		setDirection(-1);
		if (viewMode === "month") {
			prevMonth();
		} else {
			prevYear();
		}
	};

	const handleDateClick = (date: Date) => {
		selectDate(date);
		setIsPanelOpen(true);
	};

	const handleSelectMonth = (month: Date) => {
		setDirection(0);
		setMonth(month);
	};

	if (!isLoaded) return null;

	const selectedDateTodos = getTodosByDate(format(selectedDate, "yyyy-MM-dd"));

	return (
		<main className="h-screen py-6 px-4 flex flex-col overflow-hidden">
			<header className="max-w-4xl mx-auto w-full flex items-center justify-between mb-4 relative z-10 shrink-0">
				<div className="flex items-center gap-6">
					<button onClick={handlePrev} className="text-[#4F6D7A]/50 hover:text-[#4F6D7A] transition-colors p-2 text-xl font-serif">
						←
					</button>
					<h1 className="text-2xl md:text-3xl font-semibold text-[#1E1F24] tracking-tight">
						{format(currentDate, "yyyy")}年 {viewMode === "month" && <span className="text-[#4F6D7A]">· {format(currentDate, "M月", { locale: zhCN })}</span>}
					</h1>
					<button onClick={handleNext} className="text-[#4F6D7A]/50 hover:text-[#4F6D7A] transition-colors p-2 text-xl font-serif">
						→
					</button>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex bg-[#4F6D7A]/5 p-1 rounded-full border border-[#4F6D7A]/10">
						<button onClick={() => setViewMode("month")} className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${viewMode === "month" ? "bg-[#4F6D7A] text-white shadow-sm" : "text-[#4F6D7A]/60 hover:text-[#4F6D7A]"}`}>
							月
						</button>
						<button onClick={() => setViewMode("year")} className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${viewMode === "year" ? "bg-[#4F6D7A] text-white shadow-sm" : "text-[#4F6D7A]/60 hover:text-[#4F6D7A]"}`}>
							年
						</button>
					</div>

					<button onClick={goToToday} className="text-xs font-bold text-[#4F6D7A] border border-[#4F6D7A]/20 px-4 py-1.5 rounded-full uppercase tracking-widest hover:bg-[#4F6D7A] hover:text-white transition-all shadow-sm active:scale-95">
						今日
					</button>
				</div>
			</header>

			<section className="flex-1 flex flex-col justify-center overflow-y-auto">{viewMode === "month" ? <CalendarBoard currentDate={currentDate} selectedDate={selectedDate} calendarDays={calendarDays} todos={todos} onSelectDate={handleDateClick} direction={direction} /> : <YearView yearMonths={yearMonths} todos={todos} onSelectMonth={handleSelectMonth} />}</section>

			<DailyQuote />

			<AnimatePresence>{isPanelOpen && <TodoPanel date={selectedDate} todos={selectedDateTodos} onAdd={addTodo} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} onClose={() => setIsPanelOpen(false)} />}</AnimatePresence>
		</main>
	);
}
