import React, { InputHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	variant?: "ghost" | "bordered" | "journal";
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, variant = "journal", ...props }, ref) => {
	return (
		<input
			className={cn(
				"w-full bg-transparent text-lg text-[#1E1F24] placeholder:text-[#4F6D7A]/50 outline-none transition-all duration-300 font-light tracking-wide",
				{
					"border-b border-[#4F6D7A]/20 focus:border-[#e09f3e] pb-2": variant === "journal",
					"px-4 py-2 rounded-xl bg-white/50 border border-transparent focus:bg-white focus:shadow-sm focus:border-[#4F6D7A]/20 shadow-paper": variant === "bordered",
					"bg-transparent border-none p-0": variant === "ghost",
				},
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = "Input";

export default Input;
