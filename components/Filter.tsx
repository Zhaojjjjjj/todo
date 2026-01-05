"use client";

import { useEffect, useRef } from "react";
import { FilterType } from "@/types";
import { useTranslation } from "@/contexts/LanguageContext";
import gsap from "gsap";

interface FilterProps {
	currentFilter: FilterType;
	onFilterChange: (filter: FilterType) => void;
}

export default function Filter({ currentFilter, onFilterChange }: FilterProps) {
	const { t } = useTranslation();
	const containerRef = useRef<HTMLDivElement>(null);

	const filters: { value: FilterType; label: string }[] = [
		{ value: "all", label: t.all },
		{ value: "active", label: t.active },
		{ value: "completed", label: t.completed },
	];

	useEffect(() => {
		gsap.fromTo(containerRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 0.4 });
	}, []);

	return (
		<div ref={containerRef} className="flex justify-center mb-12">
			<div className="flex p-1.5 cinematic-glass rounded-full">
				{filters.map(({ value, label }) => (
					<button key={value} onClick={() => onFilterChange(value)} className={`relative px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-500 ${currentFilter === value ? "bg-purple-600/20 text-purple-400 neon-text border border-purple-500/30" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
						{label}
					</button>
				))}
			</div>
		</div>
	);
}
