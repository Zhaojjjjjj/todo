"use client";

import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { zhCN } from "date-fns/locale";
import { motion } from "framer-motion";
import { Todo } from "@/types";

interface YearViewProps {
	yearMonths: Date[];
	todos: Todo[];
	onSelectMonth: (month: Date) => void;
}

export default function YearView({ yearMonths, todos, onSelectMonth }: YearViewProps) {
	const getMonthStatus = (month: Date) => {
		const monthStart = startOfMonth(month);
		const monthEnd = endOfMonth(month);
		const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

		let totalTodos = 0;
		let completedTodos = 0;

		daysInMonth.forEach((day) => {
			const dateStr = format(day, "yyyy-MM-dd");
			const dayTodos = todos.filter((t) => t.date === dateStr);
			totalTodos += dayTodos.length;
			completedTodos += dayTodos.filter((t) => t.completed).length;
		});

		const hasTodos = totalTodos > 0;
		const allCompleted = hasTodos && totalTodos === completedTodos;

		return { hasTodos, allCompleted, totalTodos, completedTodos };
	};

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto p-4">
			{yearMonths.map((month) => {
				const { hasTodos, allCompleted, totalTodos, completedTodos } = getMonthStatus(month);

				return (
					<motion.div
						key={month.toISOString()}
						whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.05)" }}
						whileTap={{ scale: 0.98 }}
						onClick={() => onSelectMonth(month)}
						className={`
              relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col items-center justify-center min-h-[140px]
              ${hasTodos ? (allCompleted ? "bg-[#E8F5E9]/60 border-[#84A98C]/20" : "bg-[#FAEBD7]/50 border-[#C97C5D]/10") : "bg-white/60 border-transparent hover:bg-white hover:border-gray-100"}
            `}>
						<span className="text-sm font-semibold text-[#4F6D7A]/40 uppercase tracking-widest mb-1">{format(month, "yyyy")}</span>
						<h3 className="text-2xl font-serif font-bold text-[#1E1F24]">{format(month, "MMMM", { locale: zhCN })}</h3>

						{hasTodos && (
							<div className="mt-4 flex flex-col items-center">
								<div className="flex gap-1 mb-2">
									{Array.from({ length: Math.min(totalTodos, 5) }).map((_, i) => (
										<div key={i} className={`w-1.5 h-1.5 rounded-full ${i < completedTodos ? "bg-[#84A98C]" : "bg-[#C97C5D]"}`} />
									))}
									{totalTodos > 5 && <span className="text-[10px] text-[#4F6D7A]/50 ml-1">+{totalTodos - 5}</span>}
								</div>
								<span className="text-[10px] font-medium text-[#4F6D7A]/60 uppercase tracking-tighter">
									{completedTodos} / {totalTodos} 已完成
								</span>
							</div>
						)}
					</motion.div>
				);
			})}
		</div>
	);
}
