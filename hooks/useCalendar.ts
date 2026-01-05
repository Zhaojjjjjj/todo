import { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isSameMonth, isSameDay, isToday, format } from "date-fns";

export const useCalendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(new Date());

	// Generate calendar grid (including buffer days from prev/next months)
	const monthStart = startOfMonth(currentDate);
	const monthEnd = endOfMonth(monthStart);
	const startDate = startOfWeek(monthStart);
	const endDate = endOfWeek(monthEnd);

	const calendarDays = eachDayOfInterval({
		start: startDate,
		end: endDate,
	});

	const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
	const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

	const selectDate = (date: Date) => setSelectedDate(date);

	return {
		currentDate,
		selectedDate,
		calendarDays,
		nextMonth,
		prevMonth,
		selectDate,
		isSameMonth,
		isSameDay,
		isToday,
		format,
	};
};
