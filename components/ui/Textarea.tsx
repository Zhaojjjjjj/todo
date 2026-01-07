"use client";

import React, { TextareaHTMLAttributes, forwardRef, useEffect, useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	variant?: "ghost" | "bordered" | "journal";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, variant = "journal", onChange, ...props }, ref) => {
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	const adjustHeight = () => {
		const textarea = textAreaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	};

	useEffect(() => {
		adjustHeight();
	}, [props.value]);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		adjustHeight();
		if (onChange) {
			onChange(e);
		}
	};

	return (
		<textarea
			className={cn(
				"w-full bg-transparent text-lg text-[#1E1F24] placeholder:text-[#4F6D7A]/50 outline-none transition-all duration-300 font-light tracking-wide resize-none overflow-hidden",
				{
					"border-b border-[#4F6D7A]/20 focus:border-[#e09f3e] pb-2": variant === "journal",
					"px-4 py-2 rounded-xl bg-white/50 border border-transparent focus:bg-white focus:shadow-sm focus:border-[#4F6D7A]/20 shadow-paper": variant === "bordered",
					"bg-transparent border-none p-0": variant === "ghost",
				},
				className
			)}
			ref={(node) => {
				textAreaRef.current = node;
				if (typeof ref === "function") {
					ref(node);
				} else if (ref) {
					ref.current = node;
				}
			}}
			onChange={handleChange}
			rows={1}
			{...props}
		/>
	);
});
Textarea.displayName = "Textarea";

export default Textarea;
