import { motion, AnimatePresence } from "framer-motion";
import { format, startOfWeek, addDays } from "date-fns";
import DayCell from "./DayCell";
import { Todo } from "@/types";

interface CalendarBoardProps {
	currentDate: Date;
	selectedDate: Date;
	calendarDays: Date[];
	todos: Todo[];
	onSelectDate: (date: Date) => void;
	direction: number; // For slide/flip direction
}

export default function CalendarBoard({ currentDate, selectedDate, calendarDays, todos, onSelectDate, direction }: CalendarBoardProps) {
	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	// Helper to check todo status for a date
	const getDayStatus = (date: Date) => {
		const dateStr = format(date, "yyyy-MM-dd");
		const dayTodos = todos.filter((t) => t.date === dateStr);
		const totalCount = dayTodos.length;
		const completedCount = dayTodos.filter((t) => t.completed).length;
		const hasTodos = totalCount > 0;
		const allCompleted = hasTodos && totalCount === completedCount;
		return { hasTodos, allCompleted, totalCount, completedCount };
	};

	const variants = {
		enter: (direction: number) => ({
			rotateY: direction > 0 ? 90 : -90,
			opacity: 0,
		}),
		center: {
			rotateY: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut" as const,
			},
		},
		exit: (direction: number) => ({
			rotateY: direction < 0 ? 90 : -90,
			opacity: 0,
			transition: {
				duration: 0.6,
				ease: "easeIn" as const,
			},
		}),
	};

	return (
		<div className="w-full max-w-4xl mx-auto perspective-1000">
			{/* Week Header */}
			<div className="grid grid-cols-7 mb-4 px-2">
				{weekDays.map((day) => (
					<div key={day} className="text-center text-xs font-semibold text-[#4F6D7A]/60 tracking-wider uppercase">
						{day}
					</div>
				))}
			</div>

			{/* 
				Calculate height based on viewport height (vh) to ensure it fits in a single screen.
				Row height set to 10vh in DayCell.
				Gap is small (0.5rem - 1rem). 
				Estimated per row: 10vh + gap ≈ 11vh
			*/}
			<div
				className="relative overflow-visible transition-all duration-300 ease-in-out"
				style={{
					height: `calc(${Math.ceil(calendarDays.length / 7)} * 11vh)`,
					minHeight: `calc(${Math.ceil(calendarDays.length / 7)} * 11vh)`,
				}}>
				<AnimatePresence initial={false} custom={direction} mode="wait">
					<motion.div key={currentDate.toString()} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="grid grid-cols-7 gap-2 md:gap-3 absolute w-full top-0 left-0 backface-hidden" style={{ transformStyle: "preserve-3d" }}>
						{calendarDays.map((day, idx) => {
							const { hasTodos, allCompleted, totalCount, completedCount } = getDayStatus(day);
							// Check if selected
							const isSelected = format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

							return <DayCell key={day.toISOString()} date={day} currentDate={currentDate} isSelected={isSelected} onClick={onSelectDate} hasTodos={hasTodos} allCompleted={allCompleted} totalCount={totalCount} completedCount={completedCount} />;
						})}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
