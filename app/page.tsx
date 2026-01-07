"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ViewMode, useCalendar } from "@/hooks/useCalendar";
import { useTodos } from "@/hooks/useTodos";
import CalendarBoard from "@/components/CalendarBoard";
import YearView from "@/components/YearView";
import TodoPanel from "@/components/TodoPanel";

import DailyQuote from "@/components/DailyQuote";

export default function Home() {
	const { data: session, status } = useSession();
	const router = useRouter();

	const { currentDate, selectedDate, viewMode, calendarDays, yearMonths, nextMonth, prevMonth, nextYear, prevYear, selectDate, setMonth, setViewMode, goToToday } = useCalendar();

	const { todos, addTodo, toggleTodo, deleteTodo, editTodo, getTodosByDate, isLoaded } = useTodos();

	const [direction, setDirection] = useState(0);
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	// Authentication check
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status, router]);

	if (status === "loading" || !isLoaded || !session) {
		return (
			<div className="h-screen w-full flex items-center justify-center bg-[#F6F5F3] paper-texture">
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#4F6D7A]/40 text-xs font-bold uppercase tracking-[0.3em]">
					载入中...
				</motion.div>
			</div>
		);
	}

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

	const selectedDateTodos = getTodosByDate(format(selectedDate, "yyyy-MM-dd"));

	return (
		<main className="h-screen py-6 px-4 flex flex-col overflow-hidden">
			<header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 relative z-10 shrink-0">
				<div className="flex items-center gap-8">
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

					<div className="flex bg-[#4F6D7A]/5 p-1 rounded-full border border-[#4F6D7A]/10">
						<button onClick={() => setViewMode("month")} className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${viewMode === "month" ? "bg-[#4F6D7A] text-white shadow-sm" : "text-[#4F6D7A]/60 hover:text-[#4F6D7A]"}`}>
							月
						</button>
						<button onClick={() => setViewMode("year")} className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${viewMode === "year" ? "bg-[#4F6D7A] text-white shadow-sm" : "text-[#4F6D7A]/60 hover:text-[#4F6D7A]"}`}>
							年
						</button>
					</div>
				</div>

				<div className="flex items-center gap-6">
					<button onClick={goToToday} className="text-xs font-bold text-[#4F6D7A] border border-[#4F6D7A]/20 px-4 py-1.5 rounded-full uppercase tracking-widest hover:bg-[#4F6D7A] hover:text-white transition-all shadow-sm active:scale-95">
						今日
					</button>

					<div className="flex items-center gap-4 pl-6 border-l border-[#4F6D7A]/10">
						<div className="text-right hidden sm:block">
							<p className="text-xs font-bold text-[#1E1F24] tracking-tight">{session.user?.name || session.user?.username}</p>
							<button onClick={() => signOut()} className="text-[9px] font-bold text-[#4F6D7A]/40 uppercase tracking-widest hover:text-[#C97C5D] transition-colors">
								退出登录
							</button>
						</div>
						<div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-[#F6F5F3]">{session.user?.image ? <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#4F6D7A]/20 font-serif text-lg">{(session.user?.name || "U")[0]}</div>}</div>
					</div>
				</div>
			</header>

			<section className="flex-1 flex flex-col justify-center overflow-y-auto">{viewMode === "month" ? <CalendarBoard currentDate={currentDate} selectedDate={selectedDate} calendarDays={calendarDays} todos={todos} onSelectDate={handleDateClick} direction={direction} /> : <YearView yearMonths={yearMonths} todos={todos} onSelectMonth={handleSelectMonth} />}</section>

			<DailyQuote />

			<AnimatePresence>{isPanelOpen && <TodoPanel date={selectedDate} todos={selectedDateTodos} onAdd={addTodo} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} onClose={() => setIsPanelOpen(false)} />}</AnimatePresence>
		</main>
	);
}
