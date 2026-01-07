import { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, addYears, subYears, isSameMonth, isSameDay, isToday, format, startOfYear, eachMonthOfInterval, endOfYear } from "date-fns";

export type ViewMode = "month" | "year";

export const useCalendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [viewMode, setViewMode] = useState<ViewMode>("month");

	// Generate calendar grid (including buffer days from prev/next months)
	const monthStart = startOfMonth(currentDate);
	const monthEnd = endOfMonth(monthStart);
	const startDate = startOfWeek(monthStart);
	const endDate = endOfWeek(monthEnd);

	const calendarDays = eachDayOfInterval({
		start: startDate,
		end: endDate,
	});

	// Generate year months
	const yearStart = startOfYear(currentDate);
	const yearEnd = endOfYear(currentDate);
	const yearMonths = eachMonthOfInterval({
		start: yearStart,
		end: yearEnd,
	});

	const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
	const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

	const nextYear = () => setCurrentDate(addYears(currentDate, 1));
	const prevYear = () => setCurrentDate(subYears(currentDate, 1));

	const selectDate = (date: Date) => setSelectedDate(date);

	const setMonth = (date: Date) => {
		setCurrentDate(date);
		setViewMode("month");
	};

	const goToToday = () => {
		const now = new Date();
		setCurrentDate(now);
		setSelectedDate(now);
		setViewMode("month");
	};

	return {
		currentDate,
		selectedDate,
		viewMode,
		calendarDays,
		yearMonths,
		nextMonth,
		prevMonth,
		nextYear,
		prevYear,
		selectDate,
		setMonth,
		setViewMode,
		goToToday,
		isSameMonth,
		isSameDay,
		isToday,
		format,
	};
};
