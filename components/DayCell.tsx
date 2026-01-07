import { format, isSameMonth, isToday } from "date-fns";
import { motion } from "framer-motion";

interface DayCellProps {
	date: Date;
	currentDate: Date;
	isSelected: boolean;
	hasTodos: boolean;
	allCompleted: boolean;
	totalCount: number;
	completedCount: number;
	onClick: (date: Date) => void;
}

export default function DayCell({ date, currentDate, isSelected, hasTodos, allCompleted, totalCount, completedCount, onClick }: DayCellProps) {
	const isCurrentMonth = isSameMonth(date, currentDate);
	const isTodayDate = isToday(date);

	if (!isCurrentMonth) {
		return <div className="bg-transparent" style={{ height: "10vh", maxHeight: "120px", minHeight: "60px" }} />; // Empty placeholder or faded info for non-current month
	}

	// Dynamic background color based on state
	const getBgStyles = () => {
		let base = "";
		if (!hasTodos) base = "bg-white/60 border-transparent hover:bg-white hover:border-gray-100";
		else if (allCompleted) base = "bg-[#E8F5E9]/60 border-transparent hover:bg-[#E8F5E9] hover:border-[#84A98C]/20";
		else base = "bg-[#FAEBD7]/50 border-transparent hover:bg-[#FAEBD7]/80 hover:border-[#C97C5D]/20";

		if (isSelected) return `${base} border-[#4F6D7A] ring-1 ring-[#4F6D7A] shadow-lg z-10`;
		return base;
	};

	return (
		<motion.div whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }} whileTap={{ scale: 0.98 }} onClick={() => onClick(date)} style={{ height: "10vh", maxHeight: "120px", minHeight: "60px" }} className={`relative p-2 rounded-xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${getBgStyles()}`}>
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
				<div className="flex justify-between items-end p-1">
					<div className="text-[10px] font-bold text-[#4F6D7A]/50 tracking-tighter">
						{completedCount}/{totalCount}
					</div>
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
