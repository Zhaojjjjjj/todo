import { format, isSameMonth, isToday } from "date-fns";
import { motion } from "framer-motion";

interface DayCellProps {
	date: Date;
	currentDate: Date;
	isSelected: boolean;
	hasTodos: boolean;
	allCompleted: boolean;
	onClick: (date: Date) => void;
}

export default function DayCell({ date, currentDate, isSelected, hasTodos, allCompleted, onClick }: DayCellProps) {
	const isCurrentMonth = isSameMonth(date, currentDate);
	const isTodayDate = isToday(date);

	if (!isCurrentMonth) {
		return <div className="h-24 md:h-32 bg-transparent" />; // Empty placeholder or faded info for non-current month
	}

	return (
		<motion.div
			whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
			whileTap={{ scale: 0.98 }}
			onClick={() => onClick(date)}
			className={`
        relative h-24 md:h-32 p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between
        ${isSelected ? "bg-white border-[#4F6D7A] ring-1 ring-[#4F6D7A] shadow-lg" : "bg-white/60 border-transparent hover:bg-white hover:border-gray-100"}
      `}>
			<div className="flex justify-between items-start">
				<span
					className={`
          text-sm font-medium rounded-full w-7 h-7 flex items-center justify-center
          ${isTodayDate ? "bg-[#E09F3E] text-white shadow-sm" : isSelected ? "text-[#4F6D7A]" : "text-gray-500"}
        `}>
					{format(date, "d")}
				</span>
			</div>

			{hasTodos && (
				<div className="flex justify-end p-1">
					<div
						className={`
             w-2 h-2 rounded-full 
             ${allCompleted ? "bg-[#84A98C]" : "bg-[#C97C5D] animate-pulse"}
           `}
					/>
				</div>
			)}
		</motion.div>
	);
}
